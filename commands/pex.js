module.exports = {
    "name": "pex",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzą bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Zarządzanie uprawnieniami graczy na serwerze",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("PermissionsEx")
            .setDescription('PermissionsEx nie jest rozwijany od stycznia 2016 roku, a co więcej, poprzedni mantainerzy dość luźno podchodzili do naprawiania zgłoszonych bugów, przez co najnowsza dostępna wersja (1.23.4) posiada wiele krytycznych błędów.\n\nJeśli chcesz mieć stabilny serwer, sugerujemy korzystanie ze wspieranych alternatyw, np. LuckPerms (komenda **!lp**)\n\nA oto lista znanych błędów PermissionsEx:\n\n**1.** W przypadku dużych plików komenda **/pex promote** potrafi scrashować serwer.\n**2.** Czasowe uprawnienia nie wygasają poprawnie (albo wcale).\n**3.** Wyrażenia regularne powodują spadek wydajności.\n**4.** Operacje nie są wykonywane współbieżnie, więc zapisywanie dużych plików uprawnień czy sprawdzanie uprawnień w bazie danych powoduje lag na serwerze.\n**5.** Problemy z kompatybilnością z nowymi pluginami.')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}