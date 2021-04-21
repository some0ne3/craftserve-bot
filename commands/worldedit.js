module.exports = {
    "name": "worldedit",
    "options": [
        {
            "name": "Tekst",
            "description": "Tekst wyświetlany przed odpowiedzą bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Obsługa pluginu worldedit",
    "aliases": ["we"],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("WorldEdit na serwerze")
            .setDescription('Informacje na temat worldedita znajdziesz tutaj:\nhttps://github.com/Craftserve/docs/blob/master/worldedit.md')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}