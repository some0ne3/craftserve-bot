const Discord = require('discord.js');
const {token} = require('./config.json');
const bot = new Discord.Client({
    disableMentions: "everyone",
    messageCacheLifetime: 3600,
});

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection();
bot.owners = ["307212579305160704", "749259944678785085", "464890810710622210"]

require("./commandHandler")(bot)
require("./events/eventHandler")(bot);

return bot.login(token);
