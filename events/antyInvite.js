const invite_regex = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|(discordapp|discord)\.com\/invite)\/(\w{0,32})/i);
const fetch = require("node-fetch");
const config = require("../config.json");
const Discord = require("discord.js");

const checkInvite = async(message) => {
    const matches = message.content.split(/\s/).join('').match(invite_regex);

    if(!matches) return false;

    const res = await fetch(`https://discord.com/api/invites/${matches[6]}`).catch(r => console.log(r));
    const json = await res.json();

    if (json.message && (json.message === "404: Not Found" || json.message === "Unknown Invite")) {
        return false;
    } else if (json.guild && (json.guild.id === message.guild.id || config.whitelistServers.includes(json.guild.id))) {
        return false;
    } else {
        return true;
    }
}

module.exports.message = async (bot, message) => {
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

module.exports.edit = async (bot, oldMessage, message) => {
    if(message.channel.type === 'dm' || oldMessage.content === message.content) return;

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