module.exports = {
    "name": "piractwo",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzią bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Informacje na temat kmpack",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setImage("https://cdn.discordapp.com/attachments/706924626563039263/831516766920376380/unknown.png")

        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}