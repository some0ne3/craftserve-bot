const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["logi"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Logi serwerowe")
        .setDescription('Jeśli widzisz tą wiadomość, to zapewne zostałeś poproszony o podesłanie logów z swojego serwera. Prześlij nam **latest.log** z katalogu **/logs/**.\nJesli używasz Forge najlepiej wyślij też **debug.log**\n\n **[Jak znaleźć logi](https://github.com/Craftserve/docs/blob/master/logs.md)**')
        .setColor(0x224d21)
        .setFooter(`Komenda !logi | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}