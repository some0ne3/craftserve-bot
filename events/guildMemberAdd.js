const config = require("../config.json");

module.exports = async (bot, member) => {
    if(!(config.engrole_channel) || (!config.engrole_id)) return console.log("config.engrole_id or config.engrole_channel is undefined");
    const invites_before = bot.invites;
    const invites_after = await member.guild.channels.cache.get(config.engrole_channel).fetchInvites();
    const findByCode = (invites, code) => {
        return invites.filter(inv => inv.code === code).first();
    }
    invites_before.forEach(inv => {
        if (inv.uses < findByCode(invites_after, inv.code).uses) {
            if (config.engrole_channel === inv.channel.id) member.roles.add(config.engrole_id);
            bot.invites = invites_after;
        }
    })
};