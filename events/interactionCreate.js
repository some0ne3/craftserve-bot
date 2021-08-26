export default {
	name: 'interactionCreate',
	async execute(interaction, client) {
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
