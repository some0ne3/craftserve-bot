const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["optymalizacjaf"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Optymalizacja serwerów Forge")
        .setDescription('Podstawą każdego dobrze działającego serwera jest pregenerowana mapa. Można to zrobić **[wykonując instrukcje z tego poradnika](https://github.com/Craftserve/docs/blob/master/pregen.md)**. Cały proces potrwa nawet 8 godzin - przez ten czas konsola serwera w panelu CraftServe musi być otwarta by zapobiec jego uśpieniu.\n\nForge w porównaniu do Spigota i Papera ma bardzo ograniczone możliwości optymalizacji. Pierwszym krokiem będzie obniżenie wartości view-distance w pliku server.properties do jakiejś z przedziału 6-10.')
        .setColor(0x224d21)
        .setFooter(`Komenda !optymalizacjaf | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}