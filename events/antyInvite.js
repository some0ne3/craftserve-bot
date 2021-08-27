const invite_regex = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/(\w{0,32})/i)
const fetch = require("node-fetch");
const config = require("../config.json");
const Discord = require("discord.js");

const checkInvite = async(message) => {

    const matches = message.content.match(invite_regex)

    if(!matches) return false;

    const res = await fetch(`https://discord.com/api/invites/${matches[5]}`)
    const json = await res.json();

    return !(json.message && (json.message === "404: Not Found" || json.message === "Unknown Invite")|| !json.guild || message.guild?.id === json.guild?.id || config.whitelistServers.includes(json.guild.id));
}

module.exports = async (bot, message) => {
    if(message.channel.type === 'dm') return;

    const isInvite = await checkInvite(message);

    if(message.member?.hasPermission("MANAGE_MESSAGES")) return;

    if(!isInvite) return;

    const embed = new Discord.MessageEmbed()
        .setDescription(`${message.author}, nie możesz wysyłać zaproszeń!`)
        .setColor("RED");


    try {
        await message.delete();
        await message.channel.send(embed)
    } catch (e) {
        await message.channel.send("<@749259944678785085> <@307212579305160704>");
        message.channel.send("Wystąpił błąd podczas usuwania wiadomości, więcej informacji w konsolce!")
        console.log(e)
    }
}