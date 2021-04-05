﻿const Discord = require('discord.js');
const {token, prefix} = require('./config.json');
const bot = new Discord.Client();

bot.commands = new Discord.Collection()

require("./commandHandler")(bot)
require("./events/eventHandler")(bot);

bot.on('message', message => {
	if (message.author.bot) {
		return;
    }
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();


    const command = bot.commands.get(cmd);

    if(!command) return;

    bot.embed = new Discord.MessageEmbed()
        .setColor(0x224d21)
        .setFooter(`Komenda !${cmd} | ${message.author.tag}`)
        .setTimestamp()

    command.run(bot, args, message)
});

bot.login(token);