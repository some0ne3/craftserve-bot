module.exports = {
    "name": "tab",
    "options": [
        {
            "name": "Tekst",
            "description": "Tekst wyświetlany przed odpowiedzą bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Plugin na customowy tab",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Własny tab")
            .setDescription('Jednym z najlepszych pluginów, który umożliwia zrobienie własnego taba, jest plugin **TAB**.\nMożesz go pobrać **[TUTAJ](https://www.spigotmc.org/resources/tab-1-7-x-1-16-5-free-version.57806/)**');

        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}
