const Discord = require("discord.js");

module.exports = {
    "name": "google",
    "description": "Zaprowadzi Cię do rozwiązania problemu",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = new Discord.MessageEmbed()
            .setColor(0x224d21)
            .setTitle("Google")
            .setURL(`https://letmegooglethat.com/?q=${args.join("+")}`);
        return message.channel.send(embed)
    }
}