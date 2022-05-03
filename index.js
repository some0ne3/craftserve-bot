import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import { Client, Collection, Intents } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_INTEGRATIONS] });

client.commands = new Collection();

import Database from "./Database.js";

Database();

fs.readdirSync('./commands/').forEach(async dir => {
	const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = (await import(`./commands/${dir}/${file}`)).default;
		command.category = dir;
		if (fs.existsSync(`./commands/${dir}/${file.slice(0, -3)}`)) {
			const subCommands = fs.readdirSync(`./commands/${dir}/${file.slice(0, -3)}`);
			for (const subCmd of subCommands) {
				command.options.push((await import(`./commands/${dir}/${file.slice(0, -3)}/${subCmd}`)).default);
			}
		}
		client.commands.set(command.name, command);
	}
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = (await import(`./events/${file}`)).default;

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}


client.login(process.env.TOKEN);
