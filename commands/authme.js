const Discord = require('discord.js');

module.exports.command = ["authme"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Rejestracja graczy na serwerach nonpremium - AuthMe")
        .setDescription('Potrzebujesz pluginu, który obsłuży rejestrację kont na serwerze? Wypróbuj **AuthMeReloaded**:\n\n [**Pobierz najnowszą wersję AuthMe Reloaded**](https://ci.codemc.io/job/AuthMe/job/AuthMeReloaded/lastSuccessfulBuild/artifact/target/AuthMe-5.6.0-SNAPSHOT.jar)')
        .setColor(0x224d21)
        .setFooter(`Komenda !authme | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}