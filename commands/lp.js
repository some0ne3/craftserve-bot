module.exports = {
    "name": "lp",
    "description": "Zarządzanie uprawnieniami graczy na serwerze",
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Uprawnienia na serwerze Minecraft")
            .setDescription('Wiele pluginów, np. EssentialsX, wymaga nadania graczom permisji by Ci mogli korzystać z poszczególnych komend. \n\nNiestety żaden z silników nie posiada wbudowanego menedżera uprawnień, dlatego należy zainstalować odpowiedni plugin - [LuckPerms](https://ci.lucko.me/job/LuckPerms/), którego dokumentacja jest dostępna [tutaj](https://github.com/lucko/LuckPerms/wiki)')

        return message.channel.send(embed)
    }
}