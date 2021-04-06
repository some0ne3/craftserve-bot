module.exports = {
    "name": "pluginy",
    "description": "Jak poprawnie zainstalować pluginy",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Jak zainstalować pluginy?")
            .setDescription('Panel craftserve niestety nie działa, więc pluginy należy pobrać ręcznie i wrzucić je do folderu **/plugins/** w katalogu głównym naszego serwera.\n\n**[Poradnik instalacji pluginów](https://github.com/Craftserve/docs/blob/master/plugins.md)**')

        return message.channel.send(embed)
    }
}