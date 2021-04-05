const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["help", "pomoc"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Komendy serwerowe")
        .setDescription('Poniżej znajdziesz dostępne komendy:')
        .addFields(
            {name: "!authme", value: "Rejestracja i logowanie.", inline: true},
            {name: "!backup", value: "Kopie zapasowe.", inline: true},
            {name: "!coreprotect", value: "Ochrona terenu.", inline: true},
        )
        .setColor(0x224d21)
        .setFooter(`Komenda !help | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}