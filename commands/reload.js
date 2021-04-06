module.exports = {
    "name": "reload",
    "description": "Komenda `/reload`",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Reload")
            .setDescription('Używanie komendy /reload nie jest zalecane ani przez twórców silników obsługujących mody czy pluginy, ani przez nikogo kto zna się na rzeczy.\n\nPo wykonaniu tej komendy, nie mamy gwarancji, że wszystkie pluginy poprawnie się załadują w skrócie - ta komenda powoduje wiele problemów.\n\n**Zawsze restartuj serwer komendą /restart bądź przyciskiem w panelu.**\n\nOto największe problemy komendy **/reload**:\n\n**1.** Nie wszystkie pluginy poprawnie obsługują reload,\n**2.** Pluginy ładują się w złej kolejności, przez pluginy zależne mogą crashować z powodu nie spełnienia zależności.')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}