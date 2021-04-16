module.exports = {
    "name": "datapack",
    "options": [
        {
            "name": "Text",
            "description": "Opcjalne pole",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Jak dodać datapack na serwer",
    "aliases": ["datapacki"],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Datapack")
            .setDescription('W plikach serwera wejdź w folder `world`, następnie folder `datapacks` i wrzuć tam datapacki w formacie ZIP.\n(Możesz je znaleźć m.in. na stronach vanillatweaks.net, mc.voodoobeard.com)')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}