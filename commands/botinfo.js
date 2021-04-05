const os = require("os");

module.exports = {
    "name": "botinfo",
    "description": "Informacje o bocie",
    run: (bot, args, message) => {
        let totalSeconds = (message.client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const embed = bot.embed
            .setTitle("Informacje o bocie")
            .addFields(
                { name: `Procesor`, value: `${os.cpus()[0].model}` },
                { name: `Użycie ramu`, value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB` },
                { name: `Czas działania`, value: `${days}d, ${hours}h, ${minutes}m, ${seconds}s`, inline: true },
                { name: `Ping`, value: `${bot.ws.ping}ms`, inline: true },
            )
            .setThumbnail('https://awisniewski.eu/img/csrv.png')
            .setFooter("Powered by AWisniewski.eu")
            .setTimestamp()
        return message.channel.send(embed)
    }
}