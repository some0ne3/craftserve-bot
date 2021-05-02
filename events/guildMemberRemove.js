const config = require("../config.json");

module.exports = async (bot, member) => {
    if(!(config.engrole_channel) || (!config.engrole_id)) return console.log("config.engrole_id or config.engrole_channel is undefined");
    bot.invites = await member.guild.channels.cache.get(config.engrole_channel).fetchInvites();
};