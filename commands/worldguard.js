module.exports = {
    "name": "worldguard",
    "options": [
        {
            "name": "Tekst",
            "description": "Tekst wyświetlany przed odpowiedzą bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Obsługa pluginu worldguard",
    "aliases": ["wg"],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("WorldGuard na serwerze")
            .setDescription('Informacje na temat worldguarda znajdziesz tutaj:\nhttps://github.com/Craftserve/docs/blob/master/worldguard.md')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}