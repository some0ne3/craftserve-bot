module.exports = {
    "name": "lbperm",
    "description": "Uprawnienia do LogBlock",
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Jak nadać uprawnienia do LogBlocka?")
            .setDescription('Jeśli to czytasz to zapewne chcesz dać graczom dostęp do LogBlocka. Aby to zrobić upewnij się, że masz zainstalowany na serwerze plugin LuckPerms i wpisz te dwa polecenia w konsoli serwera `lp group default permission set logblock.lookup` oraz `lp group default permission set logblock.tools.tool`\nOd teraz każdy grający na serwerze będzie miał dostęp do LogBlocka!\n\nWięcej informacji dotyczących konfiguracji LogBlocka znajdziesz [pod tym linkiem](https://spigot.pl/forum/thread/6-jak-poprawnie-zainstalowa%C4%87-plugin-logblock-1-14-4-1-15-2-1-16-2-na-hostingu-craf/)')

        return message.channel.send(embed)
    }
}