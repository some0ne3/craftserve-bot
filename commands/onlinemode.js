module.exports = {
    "name": "onlinemode",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzią bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Zmiana trybu serwera na no-premium",
    "aliases": ["online-mode"],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Problem z wejściem na serwer premium?")
            .setDescription('Jeśli przy wchodzeniu na serwer wyświetla ci się taki komunikat: `Failed to log in: Invalid session` (pl. `Nie udało się zalogować: Sesja wygasła`), to oznacza, że twój serwer jest premium.\n Aby to zmienić wystarczy:\n\n' +
                '**1.** Wyłączyć serwer\n' +
                '**2.** Wejść w plik `server.properties`\n' +
                '**3.** Zmienić linijkę `online-mode: true` na `online-mode: false`\n' +
                '**4.** Zapisać plik\n' +
                '**5.** Włączyć serwer \n')

        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}