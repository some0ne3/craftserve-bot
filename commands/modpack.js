module.exports = {
    "name": "modpack",
    "description": "Jak dodać mody na serwer",
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Instalacja modpacka")
            .setDescription('https://support.craftserve.pl/hc/pl/articles/360027626811-Instalacja-modpack-%C3%B3w')

        return message.channel.send(embed)
    }
}