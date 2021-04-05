const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["craftbook"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Craftbook")
        .setDescription('https://dev.bukkit.org/projects/craftbook')
        .setColor(0x224d21)
        .setFooter(`Komenda !craftbook | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}