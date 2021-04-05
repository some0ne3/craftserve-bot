const Discord = require('discord.js');

module.exports.command = ["usunmape"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Jak usunąć mapę?")
        .setDescription('By usunąć aktualną mapę wystarczy przejść do zakładki **Pliki**, a następnie przy folderach zaczynających się najczęściej na **world (lub na twoją własną nazwę określoną w ustawieniach serwera)** kliknąć **zębatkę -> Usuń**')
        .setColor(0x224d21)
        .setFooter(`Komenda !usunmape | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}