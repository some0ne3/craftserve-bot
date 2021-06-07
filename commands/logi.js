module.exports = {
    "name": "logi",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzią bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Czym są logi i jak je znaleźć",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Logi serwerowe")
            .setDescription('Jeśli widzisz tą wiadomość, to zapewne zostałeś poproszony o podesłanie logów z swojego serwera. Prześlij nam **latest.log** z katalogu **/logs/**.\nJesli używasz Forge najlepiej wyślij też **debug.log**\n\n **[Jak znaleźć logi](https://github.com/Craftserve/docs/blob/master/logs.md)**')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}