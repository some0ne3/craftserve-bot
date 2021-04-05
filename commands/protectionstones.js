const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["ps", "protectionstones"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("ProtectionStones")
        .setDescription('"ProtectionStones to plugin, który pozwala w łatwy sposób tworzyć cuboidy poprzez stawianie >BLOKÓW MOCY<.\nPamiętaj o poprawnej jego konfiguracji zanim zgłosisz udasz się tutaj po pomoc.\n\n[JAK OBSŁUGIWAĆ PROTECTIONSTONES](https://github.com/espidev/ProtectionStones/wiki)')
        .setColor(0x224d21)
        .setFooter(`Komenda !protectionstones | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}