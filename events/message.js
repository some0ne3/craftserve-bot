const invite_regex = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/(\w{0,32})/i)
const fetch = require("node-fetch");
const config = require("../config.json");
const Discord = require("discord.js");

const checkInvite = async(message) => {

    const matches = message.content.match(invite_regex)

    if(!matches) return false;

    const res = await fetch(`https://discord.com/api/invites/${matches[5]}`)
    const json = await res.json();

    return !(json.message && (json.message === "404: Not Found" || json.message === "Unknown Invite") || message.guild.id === json.guild.id || config.whitelistServers.includes(json.guild.id));
}

module.exports = async (bot, message) => {
    if (message.author.bot || !message.guild) {
        return;
    }
    if (!message.content.startsWith(config.prefix)) return;
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if(!command) return;

    if(await checkInvite(message) && !message.member?.hasPermission("MANAGE_MESSAGES")) args = [];

    bot.embed = new Discord.MessageEmbed()
        .setColor(0x224d21)
        .setFooter(`Komenda ${config.prefix+command.name} | ${message.author.tag}`)
        .setTimestamp()

    if(command) command.run(bot, args, message)
}