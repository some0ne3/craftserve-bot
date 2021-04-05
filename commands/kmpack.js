module.exports = {
    "name": "kmpack",
    "description": "Informacje na temat kmpack",
    run: (bot, args, message) => {
        const embed = bot.embed
            .setImage(`https://cdn.discordapp.com/attachments/706924626563039263/733261498566312016/unknown.png`)

        return message.channel.send(embed)
    }
}