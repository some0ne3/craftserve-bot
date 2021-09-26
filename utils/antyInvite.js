const invite_regex = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|(discordapp|discord)\.com\/invite)\/(\w{0,32})/, 'i');
import fetch from 'node-fetch';
import { MessageEmbed } from 'discord.js';

const checkInvite = async (message) => {
	const matches = message.content.match(invite_regex);

	if (!matches) return false;

	const res = await fetch(`https://discord.com/api/invites/${matches[6]}`).catch(r => console.log(r));
	const json = await res.json();

	if (json.message && (json.message === '404: Not Found' || json.message === 'Unknown Invite')) {
		return false;
	} else if (json.guild && (json.guild.id === message.guild.id/* || config.whitelistServers.includes(json.guild.id)*/)) { //todo database whitelisted servers
		return false;
	}
	return true;
};

const handleInviteMessage = async (message) => {
	const isInvite = await checkInvite(message);

	if (message.member?.permissions.has('MANAGE_MESSAGES')) return;

	if (!isInvite) return;

	const embed = new MessageEmbed()
		.setDescription(`${message.author}, nie możesz wysyłać zaproszeń!`)
		.setColor('RED');

	try {
		await message.delete();
		await message.channel.send({ embeds: [embed] });
	} catch (e) {
		console.log(e);
	}
};
export default handleInviteMessage;

