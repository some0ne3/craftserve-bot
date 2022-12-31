import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import CustomCommands from '../models/CustomCommands.js';
import { updateDomains } from '../utils/antyPhishing.js';
import { addCustomCommand } from '../utils/customCommands.js';
import ServerSettings from '../models/ServerSettings.js';
import BotAdministrators from '../models/BotAdministrators.js';

const saveCommand = async (command, guild) => {
	command.command_id = await addCustomCommand(command, guild);
	await command.save();
};

export default {
	name: 'ready',
	once: true,
	async execute(client) {
		await updateDomains();
		setInterval(async () => await updateDomains(), 5 * 60 * 60 * 1000);

		const rest = new REST().setToken(client.token);
		const commandsToRegister = client.commands.filter(command => command.category !== 'management').map(command => ({
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

		const managementCommandsToRegister = client.commands.filter(command => command.category === 'management').map(command => ({
			name: command.name,
			description: command.description,
			options: command.options,
		}));

		const managementServers = await ServerSettings.find({ is_management_server: true });

		if (!managementServers.length && process.env.MANAGEMENT_GUILD_ID) {
			managementServers.push(
				await ServerSettings.create({
					server_id: process.env.MANAGEMENT_GUILD_ID,
					is_management_server: true,
				}),
			);
		}

		managementServers.forEach(server => {
			const guild = client.guilds.cache.get(server.server_id);
			managementCommandsToRegister.forEach(command => guild.commands.create(command).catch(e => {
				console.error(`Wystąpił błąd podczas dodawania komendy ${command.name}`);
				console.error(e);
			}));
		});

		const administrators = await BotAdministrators.find();

		if(!administrators.length && process.env.OWNER_ID) {
			await BotAdministrators.create({
				user_id: process.env.OWNER_ID,
			});
		}
		console.log('Bot is ready.');
	},
};
