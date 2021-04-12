module.exports = {
    "name": "google",
    "description": "Zaprowadzi Cię do rozwiązania problemu",
    "aliases": [],
    run: (bot, args, message) => {
        let noMentions = args.join("+").replace(/<[@#!&](.*?)>/g, "").replace(/^\+/, "").replace(/\+$/, "");
        const mention = message.mentions.users.first() || "";
        const embed = bot.embed
            .setTitle("Google")
            .setDescription(`[https://letmegooglethat.com/?q=${noMentions}](https://letmegooglethat.com/?q=${noMentions})`);
        return message.channel.send(mention, embed);
    }
}