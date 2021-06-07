module.exports = {
    "name": "sid",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzią bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Jak uzyskać sid serwera",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Unikalny numer serwera w Craftserve.pl")
            .setDescription('Każdy z serwerów w Craftserve posiada swój unikalny numer (tzw. sid), jeżeli ktoś z obsługi hostingu prosi Cię o podanie numeru serwera to możesz podać link do panelu serwera (np. `https://craftserve.pl/s/791533`) lub adres którym łączysz się z serwerem (przykładowo `s791533.csrv.pl` lub `kiwimc.csrv.pl`).\n\nUwaga: Pamiętaj, że każdy serwer posiada przypisany publiczny adres `sSID.csrv.pl`  którym można połączyć się z serwerem. Podanie numeru serwera publicznie może skończyć się wizytą niespodziewanych gości na serwerze')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}