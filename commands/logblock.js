module.exports = {
    "name": "logblock",
    "description": "Plugin zabezpieczający teren",
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Instalacja LogBlocka")
            .setDescription('Pobierz LogBlocka z [tego linku](https://www.iani.de/jenkins/job/LogBlock/lastSuccessfulBuild/artifact/target/LogBlock.jar) i wrzuć go do folderu *plugins* w plikach swojego serwera.\n\n**Na końcu przejdź do zakładki Ustawienia w panelu serwera, otwórz zakładkę MySQL, utwórz bazę danych i uruchom serwer.**\n\nWięcej informacji dotyczących konfiguracji LogBlocka (czyli jak włączyć śledzenie skrzynek oraz dać uprawnienia do drewnianego kilofa) znajdziesz [pod tym linkiem](https://spigot.pl/topic/9/jak-poprawnie-zainstalowa%C4%87-plugin-logblock-1-14-4-1-15-2-1-16-2-na-hostingu-craftserve-pl-ten-plugin-na-drewniany-kilof-z-kwadratowej-masakry)')

        return message.channel.send(embed)
    }
}