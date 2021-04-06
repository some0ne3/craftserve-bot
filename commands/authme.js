module.exports = {
    "name": "authme",
    "description": "Rejestracja i logowanie",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Rejestracja graczy na serwerach nonpremium - AuthMe")
            .setDescription('Potrzebujesz pluginu, który obsłuży rejestrację kont na serwerze? Wypróbuj **AuthMeReloaded**:\n\n [**Pobierz najnowszą wersję AuthMe Reloaded**](https://ci.codemc.io/job/AuthMe/job/AuthMeReloaded/lastSuccessfulBuild/artifact/target/AuthMe-5.6.0-SNAPSHOT.jar)')

        return message.channel.send(embed)
    }
}