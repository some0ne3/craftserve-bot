const Discord = require('discord.js');

module.exports.command = ["snapshot"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Snapshoty")
        .setDescription('Snapshot 21w06a zablokował możliwość ładowania map z starszych wersji, jeżeli przy starcie serwera ostatnią linijką jaką widzisz w konsoli jest:\n\n `[CSRV] Executing Java...`\n\n a w pliku `logs/latest.log` znajduje się wyłącznie informacja:\n\n `[main/INFO]: Loading of old worlds is temporarily disabled.`\n\nto niestety trzeba pożegnać się ze swoją aktualną mapą.\nZa pomocą komendy **!usunmape** możesz dowiedzieć się jak to zrobić.')
        .setColor(0x224d21)
        .setFooter(`Komenda !snapshot | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}