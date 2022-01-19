import { updateDomains } from '../utils/antyPhishing.js';
import CustomCommands from '../models/CustomCommands.js';
import { addAppCommand } from '../commands/mod/customCommand/add.js';

const saveCommand = async (command, guild) => {
	command.command_id = await addAppCommand(command, guild);
	await command.save();
};

export default {
	name: 'ready',
	once: true,
	async execute(client) {

		console.log(`${client.user.tag} is ready.`);

		await updateDomains(client);
		setInterval(async () => await updateDomains(client), 5 * 60 * 60 * 1000);
		const commandsToRegister = client.commands.map(command => ({
			name: command.name,
			description: command.description,
			options: command.options,
			permissions: command.permissions,
			defaultPermission: command.category === 'standard',
		}));
		const registeredCommands = await client.guilds.cache.get(process.env.GUILD).commands.set(commandsToRegister);
		const fullPermissions = registeredCommands.map(command => ({
			id: command.id,
			permissions: client.commands.get(command.name).permissions,
		})).filter(command => command.permissions);
		await client.guilds.cache.get(process.env.GUILD)?.commands.permissions.set({ fullPermissions });

		for (const guild of client.guilds.cache.values()) { //todo edit only changed/new commands?
			const customCommand = await CustomCommands.find({ parent_server_id: guild.id }).exec();

			for (const command of customCommand) {
				await saveCommand(command, guild);
			}
		}

	},
};
