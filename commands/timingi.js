module.exports = {
    "name": "timingi",
    "description": "Diagnostyka lagów",
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Diagnostyka lagów")
            .setDescription('Pierwszym krokiem jaki należy podjąć w przypadku problemów z lagami jest określenie ich natury. Komendy **/tps** i **/timings** pomogą ci ustalić co się dzieje.\n\n**[Jak wykonać timings na serwerze?](https://github.com/Craftserve/docs/blob/master/timings.md)**')

        return message.channel.send(embed)
    }
}