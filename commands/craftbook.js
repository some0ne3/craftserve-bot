module.exports = {
    "name": "craftbook",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzą bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Plugin dodający mnóstwo funkcji",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Craftbook")
            .setDescription('https://dev.bukkit.org/projects/craftbook')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}