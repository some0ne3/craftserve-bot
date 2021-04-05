const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["pluginy"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Jak zainstalować pluginy?")
        .setDescription('Panel craftserve niestety nie działa, więc pluginy należy pobrać ręcznie i wrzucić je do folderu **/plugins/** w katalogu głównym naszego serwera.\n\n**[Poradnik instalacji pluginów](https://github.com/Craftserve/docs/blob/master/plugins.md)**')
        .setColor(0x224d21)
        .setFooter(`Komenda !pluginy | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}