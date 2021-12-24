import { SlashCommandBuilder } from '@discordjs/builders';

export default {
	...new SlashCommandBuilder()
		.setName('customcommand')
		.setDescription('Zarządzanie customowymi komendami'),
	async execute(interaction) {
		const firstSub = interaction.options.getSubcommandGroup(false) ?? interaction.options.getSubcommand();

		const subCommand = interaction.client.commands.get('customcommand').options.find(x => x.name === firstSub);

		if (!subCommand) return;

		try {
			await subCommand.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Wystąpił błąd podczas wykonywania tej komendy!', ephemeral: true });
		}
	},
};