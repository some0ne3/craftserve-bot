const config = require("../config.json");
const {MessageEmbed} = require("discord.js");

const getNewInviteCodes = async (guild, client) => {
	const invites_before = client.invites;
	const invites_after = await guild.fetchInvites();
	let foundCodes = [];
	invites_before.forEach(oldInvite => {
		if (oldInvite.uses < invites_after.filter(newInvite => newInvite.code === oldInvite.code).first().uses) {
			client.invites = invites_after;
			foundCodes.push({ code: oldInvite.code, inviter: oldInvite.inviter,
				channel: oldInvite.channel, createdAt: oldInvite.createdTimestamp});
		}
	})
	return foundCodes;
};

const logMemberJoin = async (member, client) => {
	const invites = await getNewInviteCodes(member.guild, client);
	const inviteInfoEmbed = new MessageEmbed()
		.setTitle("Invite used")
		.addField("User", `${member.user.tag} (${member.user.id}) | <@${member.user.id}>`);
	invites.forEach(inv => {
		inviteInfoEmbed.addField("Invite info",
			`Code: \`${inv.code}\`
					Channel: <#${inv.channel.id}>
					Inviter: ${inv.inviter.tag} (${inv.inviter.id}) | <@${inv.inviter.id}>
					Date: <t:${(inv.createdAt/1000).toFixed()}> (<t:${(inv.createdAt/1000).toFixed()}:R>)`)
	})

	client.channels.cache.get(config.modlog_channel)?.send(inviteInfoEmbed)
};

module.exports = async (bot, member) => {
	await logMemberJoin(member, bot)
};