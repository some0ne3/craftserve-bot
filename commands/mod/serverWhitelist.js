import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { errorEmbed } from '../../utils/embeds.js';

export default {
	...new SlashCommandBuilder()
		.setName('serverwhitelist')
		.setDescription('Zarządzanie whitelistą filtra antyInvite.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageThreads)
		.setDMPermission(false)
		.toJSON(),
	async execute(interaction) {
		const firstSub = interaction.options.getSubcommand();

		const subCommand = interaction.client.commands.get('serverwhitelist').options.find(x => x.name === firstSub);

		if (!subCommand) return;

		const serverId = interaction.options.getString('server_id');

		if (!/^\d{17,19}$/.test(serverId)) return interaction.reply({ embeds: [errorEmbed(`ID: \`${serverId}\` jest niepoprawne.`)] }).catch(console.error);

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