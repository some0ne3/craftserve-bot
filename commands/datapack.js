const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["datapack"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Datapack")
        .setDescription('W plikach serwera wejdź w folder `world`, następnie folder `datapacks` i wrzuć tam datapacki w formacie ZIP.\n(Możesz je znaleźć m.in. na stronach vanillatweaks.net, mc.voodoobeard.com)')
        .setColor(0x224d21)
        .setFooter(`Komenda !datapack | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}