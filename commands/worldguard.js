const Discord = require('discord.js');

module.exports.command = ["worldguard", "wg"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("WorldGuard na serwerze")
        .setDescription('Informacje na temat worldguarda znajdziesz tutaj:\nhttps://github.com/Craftserve/docs/blob/master/worldguard.md')
        .setColor(0x224d21)
        .setFooter(`Komenda !worldguard | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}