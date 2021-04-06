module.exports = {
    "name": "pomozektos",
    "description": "Przedstaw sie i opisz swój problem",
    "aliases": ["pk"],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Przedstaw się")
            .setDescription('Jeśli potrzebujesz pomocy to **NAJPIERW PRZEDSTAW SWÓJ PROBLEM**, a potem pytaj czy ktoś umie Ci pomóc.')
            .setImage(`https://vader.joemonster.org/upload/rga/17787764d97f32c67653138_10156519191.jpg`)


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}