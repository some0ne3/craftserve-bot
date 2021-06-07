module.exports = {
    "name": "pregen",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzią bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Poprawa wydajności serwera",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Pregen mapy")
            .setDescription('Mordo, mordunio, wygeneruj mapę w ten sposób: **https://github.com/Craftserve/docs/blob/master/pregen.md**')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}