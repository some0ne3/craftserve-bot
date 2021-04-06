module.exports = {
    "name": "worldedit",
    "description": "Obsługa pluginu worldedit",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("WorldEdit na serwerze")
            .setDescription('Informacje na temat worldedita znajdziesz tutaj:\nhttps://github.com/Craftserve/docs/blob/master/worldedit.md')

        return message.channel.send(embed)
    }
}