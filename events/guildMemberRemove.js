module.exports = async (bot, member) => {
    bot.invites = await member.guild.fetchInvites();
};