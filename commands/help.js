//TODO Help na strony
module.exports = {
    "name": "help1",
    run: (bot, args, message) => {
        const embed = bot.embed

        return message.channel.send(embed)
    }
}