const invite_regex = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/(\w{0,32})/i)
const fetch = require("node-fetch");
const config = require("../config.json");

const checkInvite = async(message) => {

    const matches = message.content.match(invite_regex)

    if(!matches) return false;

    const res = await fetch(`https://discord.com/api/invites/${matches[5]}`)
    const json = await res.json();

    return !(json.message && (json.message === "404: Not Found" || json.message === "Unknown Invite") || message.guild.id === json.guild.id || config.whitelistServers.includes(json.guild.id));
}

module.exports = async (bot, message) => {
    const isInvite = await checkInvite(message);

    if(!isInvite) return;

    try {
        await message.delete();
        await message.member.ban({reason: "Reklama serwera"})
        await message.channel.send(`Wykryto reklamę serwera`)
    } catch (e) {
        const msg = await message.channel.send("<@749259944678785085> <@307212579305160704>");
        msg.delete()
        message.channel.send("Wystąpił błąd podczas banowania, więcej informacji w konsolce!")
        console.log(e)
    }
}