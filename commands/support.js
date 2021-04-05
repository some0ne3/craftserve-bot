const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["support"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Wyślij proszę oficjalne zgłoszenie do supportu.")
        .setDescription('**Możesz to zrobić poprzez:**\n1. Formularz w zakładce [Kontakt](https://craftserve.pl/contact) w panelu Craftserve,\n2. Adres email **support@craftserve.pl** podając ID swojego serwera.')
        .setColor(0x224d21)
        .setFooter(`Komenda !support | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}