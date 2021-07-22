module.exports = {
    "name": "tab",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzią bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Plugin na customowy tab",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Własny tab")
            .setDescription('Jednym z najlepszych pluginów, który umożliwia zrobienie własnego taba, jest plugin **TAB**.\nMożesz go pobrać **[TUTAJ](https://github.com/NEZNAMY/TAB/releases/latest)**\nA **[tutaj](https://github.com/NEZNAMY/TAB/wiki)** znajdziesz wszelkie instrukcje.');

        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}
