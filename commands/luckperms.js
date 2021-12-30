module.exports = {
    "name": "luckperms",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzią bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Zarządzanie uprawnieniami graczy na serwerze",
    "aliases": ["luckperms"],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Uprawnienia na serwerze Minecraft")
            .setDescription('Wiele pluginów, np. EssentialsX, wymaga nadania graczom permisji by Ci mogli korzystać z poszczególnych komend. \n\nNiestety żaden z silników nie posiada wbudowanego menedżera uprawnień, dlatego należy zainstalować odpowiedni plugin - [LuckPerms](https://luckperms.net/download), którego dokumentacja jest dostępna [tutaj](https://luckperms.net/wiki)')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}
