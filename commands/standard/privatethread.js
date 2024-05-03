import { ContextMenuCommandBuilder } from 'discord.js';

export default {
	...new ContextMenuCommandBuilder()
		.setName('Utwórz prywatny wątek')
		.setType(3)
		.setDMPermission(false)
		.toJSON(),
	async execute(interaction) {
		const message = interaction.options?.get('message')?.message;

		if (interaction.channel.isThread()) {
			return interaction.reply({
				content: 'Ta komenda może być użyta tylko na kanale',
				ephemeral: true,
			});
		}

		if (message.author.id === interaction.user.id) {
			return interaction.reply({
				content: 'Nie możesz utworzyć prywatnego wątku dla siebie',
				ephemeral: true,
			});
		}

		if (message.author.bot) {
			return interaction.reply({
				content: 'Nie możesz utworzyć prywatnego wątku dla bota',
				ephemeral: true,
			});
		}

		const thread = await message.channel.threads.create({
			name: `${message.author.username} - ${new Date().toLocaleTimeString()}`,
			autoArchiveDuration: 1440,
			reason: `${interaction.user.username} utworzył prywatny wątek dla ${message.author.username}`,
			type: 12,
			invitable: false,
		});

		await thread.members.add(message.author.id);
		await thread.members.add(interaction.user.id);

		await interaction.reply({
			content: `Utworzono prywatny wątek dla ${message.author.username}`,
			ephemeral: true,
		});

	},
};