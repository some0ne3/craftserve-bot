import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
	...new SlashCommandBuilder()
		.setName('lockpost')
		.setDescription('Zamknij i zablokuj wątek na którym została użyta komenda')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageThreads)
		.setDMPermission(false)
		.toJSON(),
	async execute(interaction) {
		const channel = interaction.channel;

		if (!channel.isThread()) {
			return interaction.reply({
				content: 'Ta komenda może być użyta tylko na wątku',
				ephemeral: true,
			});
		}

		if (channel.locked) {
			return interaction.reply({
				content: 'Ten wątek jest już zamknięty',
				ephemeral: true,
			});
		}

		await channel.setLocked(true);
		await interaction.reply({
			content: `Zablokowano wątek \`${channel.name}\``,
			ephemeral: true,
		});
		await channel.setArchived(true);
	},
};