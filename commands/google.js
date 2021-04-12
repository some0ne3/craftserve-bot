module.exports = {
    "name": "google",
    "description": "Zaprowadzi Cię do rozwiązania problemu",
    "aliases": [],
    run: (bot, args, message) => {
        const regexp = new RegExp('<[@#!&](.*?)>','g');
        const filtered = args.filter(a => !regexp.test(a)).join("+");

        const mention = message.mentions.users.first() || "";
        const embed = bot.embed
            .setTitle("Google")
            .setDescription(`[https://letmegooglethat.com/?q=${filtered}](https://letmegooglethat.com/?q=${filtered})`);
        return message.channel.send(mention, embed);
    }
}