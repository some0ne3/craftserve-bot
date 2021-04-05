const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["lp"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Uprawnienia na serwerze Minecraft")
        .setDescription('Wiele pluginów, np. EssentialsX, wymaga nadania graczom permisji by Ci mogli korzystać z poszczególnych komend. \n\nNiestety żaden z silników nie posiada wbudowanego menedżera uprawnień, dlatego należy zainstalować odpowiedni plugin - [LuckPerms](https://ci.lucko.me/job/LuckPerms/), którego dokumentacja jest dostępna [tutaj](https://github.com/lucko/LuckPerms/wiki)')
        .setColor(0x224d21)
        .setFooter(`Komenda !lp | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}