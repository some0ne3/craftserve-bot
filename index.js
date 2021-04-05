const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();
const commands = require("./commands/commandHandler");
require("./events/eventHandler")(bot);

bot.on('message', message => {
	if (message.author === bot.user) {
		return;
    }

    const content = message.content;

    if (content.length > 0) {
        const prefix = content.slice(0, 1);
        const args = content.slice(prefix.length).trim().split(/\s+/g);

        if (commands.callCommand([prefix].concat(args), message)) {
            return;
        }
    }
});

bot.login(config.token);
