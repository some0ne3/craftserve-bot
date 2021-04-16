module.exports = {
    "name": "mapa",
    "options": [
        {
            "name": "Text",
            "description": "Opcjalne pole",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Opis brakującej mapy na stronie",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Mapa w panelu Craftserve")
            .setDescription('Mapa w panelu (zakładka: Podgląd mapy) powyżej wersji 1.16 jest nieprawidłowo generowana, przez co mogą występować błędy lub brak samej mapy na podglądzie strony, jest ona uważana jako nie wspierana.\n\nPróba zainstalowania pluginu Dynmap zakończy się niepowodzeniem ponieważ jest on zablokowany, prosimy nie próbować instalacji.')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}