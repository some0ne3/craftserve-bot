const invite_regex = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|(discordapp|discord)\.com\/invite)\/(\w{0,32})/i);
import { fetch } from 'undici';
import { EmbedBuilder, PermissionsBitField } from 'discord.js';
import WhitelistedServers from '../models/WhitelistedServers.js';
import ServerSettings from '../models/ServerSettings.js';

const checkInvite = async (message) => {
	const matches = message.content.split(/ +/).join('').match(invite_regex);

	if (!matches) return false;

	const res = await fetch(`https://discord.com/api/invites/${matches[6]}`).catch(err => console.error(err));

	if (!res.ok) {
		console.error(res.status, res.statusText, res.url);
		return true;
	}

	const json = await res.json();

	if (json.message && (json.message === '404: Not Found' || json.message === 'Unknown Invite')) return false;

	const whitelistedServer = WhitelistedServers.findOne({
		whitelisted_server_id: json.guild?.id,
		parent_server_id: message.guild.id,
	}).exec();

	return !(json.guild && (json.guild.id === message.guild.id || (await whitelistedServer)));
};

export const handleInviteMessage = async (message) => {
	if (message.member?.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;

	const isEnabled = (await ServerSettings.findOne({ server_id: message.guild.id }))?.anty_invite_enabled;
	if (isEnabled !== true) return;

	const isInvite = await checkInvite(message);

	if (!isInvite) return;

	const embed = new EmbedBuilder()
		.setDescription(`${message.author}, nie możesz wysyłać zaproszeń!`)
		.setColor('Red');

	try {
		await message.delete();
		await message.channel.send({ embeds: [embed] });
	} catch (e) {
		console.log(e); // todo error management system (webhook based)
	}
};
