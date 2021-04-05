module.exports = {
    "name": "regionfixer",
    "description": "Naprawa popsutej mapy",
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Masz uszkodzoną mapę?")
            .setDescription('Spróbuj naprawić ją tym https://github.com/Fenixin/Minecraft-Region-Fixer\nInstalacja: https://github.com/Fenixin/Minecraft-Region-Fixer/wiki/Installation\nJak używać: https://github.com/Fenixin/Minecraft-Region-Fixer/wiki/Usage')

        return message.channel.send(embed)
    }
}