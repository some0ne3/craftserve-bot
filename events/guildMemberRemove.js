const config = require("../config.json");

module.exports = async (bot, member) => {
    bot.invites = await member.guild.channels.cache.get(config.engrole_channel).fetchInvites();
};