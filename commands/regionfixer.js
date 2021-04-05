const Discord = require('discord.js');

module.exports.command = ["regionfixer"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Masz uszkodzoną mapę?")
        .setDescription('Spróbuj naprawić ją tym https://github.com/Fenixin/Minecraft-Region-Fixer\nInstalacja: https://github.com/Fenixin/Minecraft-Region-Fixer/wiki/Installation\nJak używać: https://github.com/Fenixin/Minecraft-Region-Fixer/wiki/Usage')
        .setColor(0x224d21)
        .setFooter(`Komenda !regionfixer | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}