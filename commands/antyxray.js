module.exports = {
    "name": "antyxray",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzą bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Anti-Xray w silniku Paper",
    "aliases": ["antixray", "anti-xray", "anty-xray"],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Anti-Xray w paper.yml")
            .setDescription("Silnik Paper, wraz z jego forkami posiadają wbudowany system **anti-xray**. By z niego skorzystać wystarczy ustawić go w pliku `paper.yml`.\n\n Rekomendowane ustawienia anty-xraya (razem z netherem) znajdziesz [**tutaj**](<https://gist.github.com/stonar96/ba18568bd91e5afd590e8038d14e245e#recommended-settings>)")

        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}