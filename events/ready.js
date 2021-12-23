import { updateDomains } from '../utils/antyPhishing.js';

export default {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`${client.user.tag} is ready.`);

		await updateDomains(client);
		setInterval(async () => await updateDomains(client), 5 * 60 * 60 * 1000);
		// todo add custom commands with default ones
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
	},
};
