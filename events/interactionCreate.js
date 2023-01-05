import { EmbedBuilder } from 'discord.js';
import CustomCommands from '../models/CustomCommands.js';
import BotAdministrators from '../models/BotAdministrators.js';
import ServerSettings from '../models/ServerSettings.js';

const autocomplete = async (interaction) => {
	switch (interaction.commandName) {
	case 'customcommand': {
		const commands = await CustomCommands.find({ parent_server_id: interaction.guild?.id }).exec();

		interaction.respond(
			commands.map(cmd => ({ name: cmd.command_name, value: cmd.command_name }))
				.filter(x => x.name.includes(interaction.options.get('cmd_name').value))
				.slice(0, 25),
		);
		break;
	}
	case 'administrator': {
		const administrators = await BotAdministrators.find();

		for (const administrator of administrators) {
			await interaction.client.users.fetch(administrator.user_id);
		}

		const result = administrators.map(administrator => {
			const user = interaction.client.users.cache.get(administrator.user_id);

			return {
				name: `${user.tag} (${user.id})`,
				value: String(user.id),
			};
		})
			.filter(item => item.name.includes(interaction.options.getFocused()))
			.slice(0, 25);

		interaction.respond(result);
		break;
	}
	}
};

const handleCustomCommand = async (interaction, client, customCommand) => {

	let content = '';
	const embeds = [];

	if (customCommand.copy_user_input && interaction.options.get('tekst')) {
		content += interaction.options.get('tekst').value + ' ';
	}
	if (customCommand.command_content) {
		content += customCommand.command_content;
	}
	customCommand?.embed_json && embeds.push(new EmbedBuilder(JSON.parse(customCommand.embed_json)));

	interaction.reply({ embeds, content: content.length > 0 ? content : undefined }).catch(console.error);
};

export default {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (interaction.isAutocomplete()) return autocomplete(interaction, client);
		if (!interaction.isCommand()) return;

		const customCommand = await CustomCommands.find({
			parent_server_id: interaction.guild?.id,
			command_name: interaction.commandName,
		}).exec();

		if (customCommand[0]) return handleCustomCommand(interaction, client, customCommand[0]);

		if (!client.commands.has(interaction.commandName)) return;

		const clientCommand = client.commands.get(interaction.commandName);
		if (clientCommand.category === 'management') {
			const isManagementServer = (await ServerSettings.findOne({ server_id: interaction.guild.id }))?.is_management_server;
			const isAdminUser = (await BotAdministrators.findOne({ user_id: interaction.user.id }));

			if (!isManagementServer || !isAdminUser) {
				return interaction.reply({
					content: 'Nie masz uprawnień do użycia tej komendy!',
					ephemeral: true,
				});
			}
		}

		try {
			await clientCommand.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'Wystąpił błąd podczas wykonywania tej komendy!',
				ephemeral: true,
			}).catch(console.error);
		}
	},
};
