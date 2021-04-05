module.exports = {
    "name": "optymalizacja",
    "description": "Poprawa wydajności serwera",
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Optymalizacja serwera Minecraft")
            .setDescription('Podstawą każdego dobrze działającego serwera jest pregenerowana mapa. Można to zrobić [wykonując instrukcje z tego poradnika](https://github.com/Craftserve/docs/blob/master/pregen.md). Cały proces potrwa nawet 8 godzin.\n\nWydajność niektórych wersji Minecrafta woła o pomstę do nieba i samo generowanie mapy może nie wystarczyć. Jeśli lagi są zmorą Twojego serwera, sprawdź [poradnik przetłumaczony przez artur9010 dotyczący optymalizacji serwera Minecraft](http://bit.ly/39DWAhC).')

        return message.channel.send(embed)
    }
}