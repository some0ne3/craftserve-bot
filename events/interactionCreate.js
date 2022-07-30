import { EmbedBuilder } from 'discord.js';
import CustomCommands from '../models/CustomCommands.js';

const autocomplete = async (interaction) => {
	const subCommand = interaction.options.getSubcommandGroup(false) ?? interaction.options.getSubcommand();

	switch(subCommand) {
	case 'remove':
	case 'reload':
	case 'edit': {
		const commands = await CustomCommands.find({ parent_server_id: interaction.guild?.id }).exec();

		interaction.respond(
			commands.map(cmd => ({ name: cmd.command_name, value: cmd.command_name })),
		);
		break;
	}
	}
};

const handleCommand = async (interaction, client, customCommand) => {

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
		if(interaction.isAutocomplete()) return autocomplete(interaction, client);
		if (!interaction.isCommand()) return;

		const customCommand = await CustomCommands.find({ parent_server_id: interaction.guild?.id, command_name: interaction.commandName }).exec();

		if(customCommand[0]) return handleCommand(interaction, client, customCommand[0]);

		if (!client.commands.has(interaction.commandName)) return;

		try {
			await client.commands.get(interaction.commandName).execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'Wystąpił błąd podczas wykonywania tej komendy!',
				ephemeral: true,
			}).catch(console.error);
		}
	},
};
