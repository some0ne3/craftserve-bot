module.exports = {
    "name": "radiacja",
    "options": [
        {
            "name": "Text",
            "description": "Opcjalne pole",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Strefa radiacji",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Radiacja na serwerze")
            .setDescription('Przy pierwszym uruchomieniu pluginu potrzebujesz ustalić region który oznaczy obszar jako wolny od radiacji. W innym wypadku strefa radiacji nie będzie działać. Użyj komendy `/radiation safe <radius>` by stworzyć obszar wolny od radiacji w formie sześcianu (cuboid) w promieniu radius od twojej obecnej lokalizacji. Region zostanie założony na pełną wysokość świata. Teraz po wyjściu z regionu wolnego od radiacji powinien pokazywać się boss bar oraz gracze powinni otrzymywać obrażenia. Płyn Lugola można nadać sobie za pomocą komendy `/radiation potion`.')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}