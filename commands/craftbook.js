module.exports = {
    "name": "craftbook",
    "description": "Plugin dodający mnóstwo funkcji",
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Craftbook")
            .setDescription('https://dev.bukkit.org/projects/craftbook')

        return message.channel.send(embed)
    }
}