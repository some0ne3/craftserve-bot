import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import CustomCommands from '../models/CustomCommands.js';
import { updateDomains } from '../utils/antyPhishing.js';
import { addCustomCommand } from '../utils/customCommands.js';

const saveCommand = async (command, guild) => {
	command.command_id = await addCustomCommand(command, guild);
	await command.save();
};

export default {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log('Bot is ready.');

		await updateDomains();
		setInterval(async () => await updateDomains(), 5 * 60 * 60 * 1000);

		const rest = new REST().setToken(client.token);
		const commandsToRegister = client.commands.map(command => ({
			name: command.name,
			description: command.description,
			options: command.options,
		}));

		await rest.put(
			Routes.applicationCommands(client.user.id),
			{
				body: [...commandsToRegister],
			},
		);

		for (const guild of client.guilds.cache.values()) {
			// todo edit only changed/new commands?
			const customCommands = await CustomCommands.find({ parent_server_id: guild.id }).exec();

			for (const command of customCommands) {
				await saveCommand(command, guild);
			}
		}

	},
};
