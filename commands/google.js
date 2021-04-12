module.exports = {
    "name": "google",
    "description": "Zaprowadzi Cię do rozwiązania problemu",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Google")
            .setDescription(`[https://letmegooglethat.com/?q=${args.join("+")}](https://letmegooglethat.com/?q=${args.join("+")})`);
        return message.channel.send(embed)
    }
}