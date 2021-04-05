module.exports = {
    "name": "usunmape",
    "description": "Jak usunąć starą mapę",
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Jak usunąć mapę?")
            .setDescription('By usunąć aktualną mapę wystarczy przejść do zakładki **Pliki**, a następnie przy folderach zaczynających się najczęściej na **world (lub na twoją własną nazwę określoną w ustawieniach serwera)** kliknąć **zębatkę -> Usuń**')

        return message.channel.send(embed)
    }
}