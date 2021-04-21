module.exports = {
    "name": "pluginy",
    "options": [
        {
            "name": "Tekst",
            "description": "Tekst wyświetlany przed odpowiedzą bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Jak poprawnie zainstalować pluginy",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Jak zainstalować pluginy?")
            .setDescription('Panel craftserve niestety nie działa, więc pluginy należy pobrać ręcznie i wrzucić je do folderu **/plugins/** w katalogu głównym naszego serwera.\n\n**[Poradnik instalacji pluginów](https://github.com/Craftserve/docs/blob/master/plugins.md)**')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}