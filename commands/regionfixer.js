module.exports = {
    "name": "regionfixer",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzią bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Naprawa popsutej mapy",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Masz uszkodzoną mapę?")
            .setDescription('Spróbuj naprawić ją tym https://github.com/Fenixin/Minecraft-Region-Fixer\nInstalacja: https://github.com/Fenixin/Minecraft-Region-Fixer/wiki/Installation\nJak używać: https://github.com/Fenixin/Minecraft-Region-Fixer/wiki/Usage')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}