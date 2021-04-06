module.exports = {
    "name": "pregen",
    "description": "Poprawa wydajności serwera",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Pregen mapy")
            .setDescription('Mordo, mordunio, wygeneruj mapę w ten sposób: **https://github.com/Craftserve/docs/blob/master/pregen.md**')

        return message.channel.send(embed)
    }
}