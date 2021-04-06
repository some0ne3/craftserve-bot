module.exports = {
    "name": "optymalizacjaf",
    "description": "Poprawa wydajności serwera",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Optymalizacja serwerów Forge")
            .setDescription('Podstawą każdego dobrze działającego serwera jest pregenerowana mapa. Można to zrobić **[wykonując instrukcje z tego poradnika](https://github.com/Craftserve/docs/blob/master/pregen.md)**. Cały proces potrwa nawet 8 godzin - przez ten czas konsola serwera w panelu CraftServe musi być otwarta by zapobiec jego uśpieniu.\n\nForge w porównaniu do Spigota i Papera ma bardzo ograniczone możliwości optymalizacji. Pierwszym krokiem będzie obniżenie wartości view-distance w pliku server.properties do jakiejś z przedziału 6-10.')

        return message.channel.send(embed)
    }
}