const Discord = require('discord.js');
const {token, prefix} = require('./config.json');
const bot = new Discord.Client({
    disableMentions: "everyone",
    messageCacheLifetime: 3600,
});

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection();
bot.owners = ["307212579305160704", "749259944678785085"]

require("./commandHandler")(bot)
require("./events/eventHandler")(bot);

bot.on('message', message => {
    if (message.author.bot) {
        return;
    }
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    let command = bot.commands.get(cmd);
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));

    bot.embed = new Discord.MessageEmbed()
        .setColor(0x224d21)
        .setFooter(`Komenda !${cmd} | ${message.author.tag}`)
        .setTimestamp()

    if(command) command.run(bot, args, message)
});

return bot.login(token);
