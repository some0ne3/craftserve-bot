module.exports = {
    "name": "seed",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzią bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Jak użyć własnego seed'a",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Chcesz zmienić seed na własny?")
            .setDescription('Zrób 7 prostych kroków:\n\n1. Wyłącz serwer\n2. Otwórz główny katalog serwera.\n3. Znajdź plik server.properties i go otwórz.\n4. Znajdź linijkę level-seed=\n5. Wpisz po = swój seed.\n6. Zapisz plik, usuń starą mapę i uruchom serwer.\n7. Gotowe!')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}