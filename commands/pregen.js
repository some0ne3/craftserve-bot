const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["pregen"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Pregen mapy")
        .setDescription('Mordo, mordunio, wygeneruj mapę w ten sposób: **https://github.com/Craftserve/docs/blob/master/pregen.md**')
        .setColor(0x224d21)
        .setFooter(`Komenda !pregen | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}