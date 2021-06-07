module.exports = {
    "name": "magma",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzą bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Uruchamianie silnika Magma",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Silnik Magma - nie uruchamia się")
            .setDescription('Przejdź do plików serwera, otwórz plik magma.yml i zmień wartość `auto-update` z `true` na `false`')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}