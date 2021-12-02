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
            .setDescription('Wersje 1.17 i 1.18 wprowadzają wymóg używania odpowiednio javy 16 i 17. By zmienić wersję javy należy wybrać wersję, która nas interesuje oraz zatwierdzić dwa razy.\n\n[Film Instruktażowy](https://static.bombsite.be/csrv/java.mp4)');

        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}