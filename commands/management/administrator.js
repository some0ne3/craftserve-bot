import { SlashCommandBuilder } from 'discord.js';

export default {
	...new SlashCommandBuilder()
		.setName('administrator')
		.setDescription('Pozwala dodać oraz usunąć administratora bota')
		.toJSON(),
	async execute(interaction) {
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
