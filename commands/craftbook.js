module.exports = {
    "name": "craftbook",
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Craftbook")
            .setDescription('https://dev.bukkit.org/projects/craftbook')

        return message.channel.send(embed)
    }
}