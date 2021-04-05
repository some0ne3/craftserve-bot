const Discord = require('discord.js');

module.exports.command = ["coreprotect"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("CoreProtect")
        .setDescription('Najlepszym zamiennikiem LogBlock jest plugin o nazwie CoreProtect\nAby go pobrać kliknij w [link](https://www.spigotmc.org/resources/coreprotect.8631/)\nJeśli nadal wolisz logblock znajdziesz go pod komendą **!logblock**')
        .setColor(0x224d21)
        .setFooter(`Komenda !coreprotect | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}