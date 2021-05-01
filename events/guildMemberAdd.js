const config = require("../config.json");

module.exports = async (bot, member) => {
    const invites_before = bot.invites;
    const invites_after = await member.guild.fetchInvites();
    const findByCode = (invites, code) => {
        return invites.filter(inv => inv.code === code).first();
    }
    invites_before.forEach(inv => {
        if (inv.uses < findByCode(invites_after, inv.code).uses) {
            if (config.engrole_code === inv.code) member.roles.add(config.engrole_id);
            bot.invites = invites_after;
        }
    })
};