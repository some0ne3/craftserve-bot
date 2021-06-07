module.exports = {
    "name": "snapshot",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzią bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Informacje na temat snapshotów",
    "aliases": ["snapshoty"],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Snapshoty")
            .setDescription('Snapshot 21w15a zablokował możliwość ładowania map z starszych snapshotów (`21w06a`-`21w14a`), jeżeli przy starcie serwera ostatnią linijką jaką widzisz w konsoli jest:\n\n `[CSRV] Executing Java...`\n\n a w pliku `logs/latest.log` znajduje się wyłącznie informacja:\n\n `[main/INFO]: Loading of old worlds is temporarily disabled.`\n\nto niestety trzeba pożegnać się ze swoją aktualną mapą.\nZa pomocą komendy **!usunmape** możesz dowiedzieć się jak to zrobić.')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}
