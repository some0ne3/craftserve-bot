module.exports = {
    "name": "datapack",
    "description": "Jak dodać datapack na serwer",
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Datapack")
            .setDescription('W plikach serwera wejdź w folder `world`, następnie folder `datapacks` i wrzuć tam datapacki w formacie ZIP.\n(Możesz je znaleźć m.in. na stronach vanillatweaks.net, mc.voodoobeard.com)')

        return message.channel.send(embed)
    }
}