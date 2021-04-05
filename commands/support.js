module.exports = {
    "name": "support",
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Wyślij proszę oficjalne zgłoszenie do supportu.")
            .setDescription('**Możesz to zrobić poprzez:**\n1. Formularz w zakładce [Kontakt](https://craftserve.pl/contact) w panelu Craftserve,\n2. Adres email **support@craftserve.pl** podając ID swojego serwera.')

        return message.channel.send(embed)
    }
}