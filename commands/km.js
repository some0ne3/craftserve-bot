module.exports = {
    "name": "km",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzią bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Pakiet Kwadratowa Masakra",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Kwadratowa masakra - Serwer")
            .setDescription('**Czy chcesz założyć swoją własną Kwadratową Masakrę?**\n\nMamy pakiet specjalnie dla Ciebie! **<https://craftserve.pl/create/km>**\n\nPakiet zawiera wszystkie pluginy, jakie znasz z KM, a do tego serwery z tego pakietu są gotowe do gry od razu w momencie zakupu! **Bez konieczności grzebania w ustawieniach!**')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}