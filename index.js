const Discord = require('discord.js');
const {token, prefix} = require('./config.json');
const bot = new Discord.Client();

bot.commands = new Discord.Collection()

require("./commandHandler")(bot)
require("./events/eventHandler")(bot);

bot.embed = new Discord.MessageEmbed()
    .setColor(0x224d21)
    .setFooter(`Komenda !authme | ${message.author.tag}`)
    .setTimestamp()

bot.on('message', message => {
	if (message.author.bot) {
		return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();


    const command = bot.commands.get(cmd);

    if(!command) return;
    command.run(bot, args, message)
});

bot.login(token);
