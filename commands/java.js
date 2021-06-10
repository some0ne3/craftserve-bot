module.exports = {
    "name": "java",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzią bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Zmiana wersji javy na hostingu craftserve",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Zmiana wersji Javy")
            .setDescription('Wersja 1.17 wprowadza wymóg używania javy 16. By zmienić wersję javy na `16` należy wybrać wersję 1.17 oraz zatwierdzić dwa razy.\n\n[Film Instruktażowy](https://static.bombsite.be/csrv/java.mp4)');

        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}