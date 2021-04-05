const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["mapa"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Mapa w panelu Craftserve")
        .setDescription('Mapa w panelu (zakładka: Podgląd mapy) powyżej wersji 1.16 jest nieprawidłowo generowana, przez co mogą występować błędy lub brak samej mapy na podglądzie strony, jest ona uważana jako nie wspierana.\n\nPróba zainstalowania pluginu Dynmap zakończy się niepowodzeniem ponieważ jest on zablokowany, prosimy nie próbować instalacji.')
        .setColor(0x224d21)
        .setFooter(`Komenda !mapa | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}