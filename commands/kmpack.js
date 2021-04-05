const Discord = require('discord.js');

module.exports.command = ["kmpack"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setImage(`https://cdn.discordapp.com/attachments/706924626563039263/733261498566312016/unknown.png`)
        .setColor(0x224d21)
        .setFooter(`Komenda !kmpack | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}