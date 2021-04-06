module.exports = {
    "name": "swiat",
    "description": "Jak użyć własnego świata",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Jak wgrać własną mapę")
            .setDescription('By wgrać mapę na serwer należy jej folder uploadować do głównego katalogu serwera za pomocą programu FTP.\nNastępnie proszę przejść do panelu ustawień serwera do zakładki `Serwer` i tam w opcji `Nazwa świata` proszę wybrać nowo wgrany świat.\nTeraz wystarczy uruchomić serwer i na niego wejść.\n\nInformacje o tym jak wgrywać pliki na serwer za pomocą programu FTP znajdują się pod poleceniem **!ftp**')

        return message.channel.send(embed)
    }
}