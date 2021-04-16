module.exports = {
    "name": "modpack",
    "options": [
        {
            "name": "Text",
            "description": "Opcjalne pole",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Jak dodać mody na serwer",
    "aliases": ["modpaki", "modpacki"],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Instalacja modpacka")
            .setDescription('https://support.craftserve.pl/hc/pl/articles/360027626811-Instalacja-modpack-%C3%B3w')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}