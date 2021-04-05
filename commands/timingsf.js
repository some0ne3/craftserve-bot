const Discord = require('discord.js');

module.exports.command = ["forgetimings"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Timingi Forge")
        .setDescription('https://mcforge.readthedocs.io/en/latest/gettingstarted/debugprofiler/')
        .setColor(0x224d21)
        .setFooter(`Komenda !forgetimings | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}