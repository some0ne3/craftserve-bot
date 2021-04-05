const Discord = require('discord.js');

module.exports.command = ["modpack"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Instalacja modpacka")
        .setDescription('https://support.craftserve.pl/hc/pl/articles/360027626811-Instalacja-modpack-%C3%B3w')
        .setColor(0x224d21)
        .setFooter(`Komenda !modpack | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}