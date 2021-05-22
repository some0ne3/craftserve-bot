module.exports = {
    "name": "ftp",
    "options": [
        {
            "name": "Tekst",
            "description": "Tekst wyświetlany przed odpowiedzą bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Zarządzanie plikami",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("File Transfer Protocol")
            .setDescription('Najwygodniejszym sposobem na edycję plików serwerowych jest skorzystanie z **FTP**. Wystarczy ściągnąć klienta FTP o nazwie **WINSCP**. Aby go pobrać należy wejść na **[tę stronę](https://winscp.net/eng/download.php)**. Następnie trzeba kliknąć guzik **DOWNLOAD**.\n\n' +
                '**[Szczegółowa instrukcja](https://github.com/Craftserve/docs/blob/master/ftp.md#poradnik-ftp---%C5%82%C4%85czenie-si%C4%99-z-craftserve)**')
            .setImage(`https://github.com/Craftserve/docs/raw/master/img/ftp/3.png`)


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}