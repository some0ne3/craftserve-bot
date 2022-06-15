import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord-api-types/v9';

export default {
	...new SlashCommandBuilder()
		.setName('settings')
		.setDescription('Zarządzanie ustawieniami serwera')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageThreads)
		.toJSON(),
	async execute(interaction) {
		const firstSub = interaction.options.getSubcommandGroup(false) ?? interaction.options.getSubcommand();

		const subCommand = interaction.client.commands.get('settings').options.find(x => x.name === firstSub);

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