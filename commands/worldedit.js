const Discord = require('discord.js');

module.exports.command = ["worldedit", "we"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("WorldEdit na serwerze")
        .setDescription('Informacje na temat worldedita znajdziesz tutaj:\nhttps://github.com/Craftserve/docs/blob/master/worldedit.md')
        .setColor(0x224d21)
        .setFooter(`Komenda !worldedit | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}