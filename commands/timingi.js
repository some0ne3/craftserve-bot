const Discord = require('discord.js');

module.exports.command = ["timingi"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Diagnostyka lagów")
        .setDescription('Pierwszym krokiem jaki należy podjąć w przypadku problemów z lagami jest określenie ich natury. Komendy **/tps** i **/timings** pomogą ci ustalić co się dzieje.\n\n**[Jak wykonać timings na serwerze?](https://github.com/Craftserve/docs/blob/master/timings.md)**')
        .setColor(0x224d21)
        .setFooter(`Komenda !timingi | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}