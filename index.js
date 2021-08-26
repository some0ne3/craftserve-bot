import fs from 'fs';
import { Client, Collection, Intents } from 'discord.js';
import permissions from './permissions.json';
import config from './config.json.example';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_INTEGRATIONS] });
client.commands = new Collection();

fs.readdirSync('./commands/').forEach(dir => {
	const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = import(`./commands/${dir}/${file}`);
		command.category = dir;
		if(!command.permissions) command.permissions = permissions[dir];
		client.commands.set(command.name, command);
	}
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = import(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}


client.login(config.token);
