module.exports = {
    "name": "logblock",
    "options": [
        {
            "name": "Text",
            "description": "Opcjalne pole",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Plugin zabezpieczający teren",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Instalacja LogBlocka")
            .setDescription('Pobierz LogBlocka z [tego linku](https://www.iani.de/jenkins/job/LogBlock/lastSuccessfulBuild/artifact/target/LogBlock.jar) i wrzuć go do folderu *plugins* w plikach swojego serwera.\n\n**Na końcu przejdź do zakładki Ustawienia w panelu serwera, otwórz zakładkę MySQL, utwórz bazę danych i uruchom serwer.**\n\nWięcej informacji dotyczących konfiguracji LogBlocka (czyli jak włączyć śledzenie skrzynek oraz dać uprawnienia do drewnianego kilofa) znajdziesz [pod tym linkiem](https://spigot.pl/forum/thread/6-jak-poprawnie-zainstalowa%C4%87-plugin-logblock-1-14-4-1-15-2-1-16-na-hostingu-crafts/)')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}