const Discord = require('discord.js');
const os = require("os");
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["botinfo"];

module.exports.callback = function(args, message) {
    let totalSeconds = (message.client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
    const embed = new Discord.MessageEmbed()
        .setColor(0x800080)
        .setTitle(messages.botinfo.title)
        .setDescription(message.client.user)
        .addFields(
            { name: `${messages.botinfo.cpu}`, value: `${os.cpus()[0].model}` },
            { name: `${messages.botinfo.ram}`, value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB` },
            { name: `${messages.botinfo.uptime}`, value: `${days}d, ${hours}h, ${minutes}m, ${seconds}s`, inline: true },
            { name: `${messages.botinfo.ping}`, value: `${Date.now() - message.createdTimestamp} ms`, inline: true },
        )
        .setThumbnail('https://awisniewski.eu/img/kermit.jpg')
        .setFooter(messages.botinfo.owner)
        .setTimestamp()
            message.channel.send(embed);
};