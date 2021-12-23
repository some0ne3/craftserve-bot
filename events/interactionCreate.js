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

export default {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if(interaction.isAutocomplete()) return autocomplete(interaction, client);
		if (!interaction.isCommand()) return;

		if (!client.commands.has(interaction.commandName)) return;

		try {
			await client.commands.get(interaction.commandName).execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Wystąpił błąd podczas wykonywania tej komendy!', ephemeral: true });
		}
	},
};
