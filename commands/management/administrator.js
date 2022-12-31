import { SlashCommandBuilder } from 'discord.js';
import ServerSettings from '../../models/ServerSettings.js';
import BotAdministrators from '../../models/BotAdministrators.js';

export default {
	...new SlashCommandBuilder()
		.setName('administrator')
		.setDescription('Pozwala dodać oraz usunąć administratora bota')
		.toJSON(),
	async execute(interaction) {
		const isManagementServer = (await ServerSettings.findOne({ server_id: interaction.guild.id }))?.is_management_server;
		const isAdminUser = (await BotAdministrators.findOne({ user_id: interaction.user.id }));

		if (!isManagementServer || !isAdminUser) return interaction.reply({ content: 'Nie masz uprawnień do użycia tej komendy!', ephemeral: true });

		const firstSub = interaction.options.getSubcommandGroup(false) ?? interaction.options.getSubcommand();

		const subCommand = interaction.client.commands.get('administrator').options.find(x => x.name === firstSub);

		if (!subCommand) return;

		try {
			await subCommand.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'Wystąpił błąd podczas wykonywania tej komendy!',
				ephemeral: true,
			}).catch(console.error);
		}
	},
};
