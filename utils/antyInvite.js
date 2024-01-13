const invite_regex = new RegExp(/(https?:\/\/)?(www\.)?(discord\.gg|(discordapp|discord)\.com\/invite)\/([\w-]{0,32})/i);
const domain_regex = new RegExp(/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi);

import { fetch } from 'undici';
import { EmbedBuilder, PermissionsBitField } from 'discord.js';
import { handleMissingPermissionsError } from './errorHandlers.js';
import WhitelistedServers from '../models/WhitelistedServers.js';
import ServerSettings from '../models/ServerSettings.js';
import Duration from 'duration-js';
import { startFollowing } from 'follow-redirect-url';

const getFinalUrl = async (url) => {
	return startFollowing(url, { max_redirect_length: 25, request_timeout: 10000 }).then(redirects => {
		return redirects.pop()?.url;
	}, reason => {
		return { error: true, reason };
	});
};

const checkForRedirects = async (content, guild) => {
	const matches = content.match(domain_regex);
	if (!matches) return false;

	for (const match of matches) {
		const finalUrl = await getFinalUrl(match);
		if (finalUrl.error) {
			console.log(`[AntyInvite] Error scanning ${match}: ${finalUrl.reason}`);
			return false;
		}

		const inviteCheck = await checkInvite(finalUrl, guild);
		if(inviteCheck) return true;
	}

	return false;
};

const checkInvite = async (content, guild) => {
	const matches = content.match(invite_regex);

	if (!matches) return false;

	const res = await fetch(`https://discord.com/api/invites/${matches[5]}`).catch(err => console.error(err));

	if (!res.ok && res.status !== 404) {
		console.error(res.status, res.statusText, res.url);
		return true;
	}

	const json = await res.json();

	if (json.message && (json.message === '404: Not Found' || json.message === 'Unknown Invite')) return false;

	const whitelistedServer = WhitelistedServers.findOne({
		whitelisted_server_id: json.guild?.id,
		parent_server_id: guild.id,
	}).exec();

	return !(json.guild && (json.guild.id === guild.id || (await whitelistedServer)));
};

export const handleInviteMessage = async (message) => {
	if (message.member?.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;

	const serverSettings = await ServerSettings.findOne({ server_id: message.guild.id });
	const timeoutDuration = serverSettings?.anty_invite_timeout;
	const isEnabled = serverSettings?.anty_invite_enabled;
	if (isEnabled !== true) return;

	const isInvite = await checkInvite(message.content, message.guild);
	const isRedirectInvite = await checkForRedirects(message.content, message.guild);

	if (!isInvite && !isRedirectInvite) return;

	const embed = new EmbedBuilder()
		.setDescription(`${message.author}, nie możesz wysyłać zaproszeń!`)
		.setColor('Red');

	message.delete().catch(handleMissingPermissionsError);

	if (timeoutDuration) {
		const parsedDurationMs = Duration.parse(timeoutDuration).milliseconds();
		if (parsedDurationMs !== 0) {
			message.member.timeout(parsedDurationMs, 'Communication disabled due to invite posting.')
				.catch(handleMissingPermissionsError);
		}
	}

	message.channel.send({ embeds: [embed] }).catch(handleMissingPermissionsError);
};
