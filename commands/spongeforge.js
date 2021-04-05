const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["spongeforge"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Pluginy na Forge?")
        .setDescription('Chcesz mieć pluginy na serwerze z Forge? **Godząc się na pewne ustępstwa** jest to możliwe!\n**[Jak zainstalować SpongeForge](https://github.com/Craftserve/docs/blob/master/spongeforge.md)**\n**[Oficjalny download SpongeForge](https://www.spongepowered.org/downloads/spongeforge/stable/1.12.2)**')
        .setColor(0x224d21)
        .setFooter(`Komenda !spongeforge | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}