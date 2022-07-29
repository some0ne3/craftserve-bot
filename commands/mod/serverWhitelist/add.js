import { errorEmbed, successEmbed } from '../../../utils/embeds.js';
import { SlashCommandSubcommandBuilder } from '@discordjs/builders';
import WhitelistedServers from '../../../models/WhitelistedServers.js';

export default {
	...new SlashCommandSubcommandBuilder()
		.setName('add')
		.setDescription('Pozwala na dodanie serwera do whitelisty antyInvite.')
		.addStringOption(string =>
			string.setName('server_id')
				.setDescription('Serwer do dodania na whitelistę antyInvite')
				.setRequired(true),
		)
		.toJSON(),
	async execute(interaction) {
		const serverId = interaction.options.getString('server_id');

		const addedServer = new WhitelistedServers({
			whitelisted_server_id: serverId,
			parent_server_id: interaction.guild?.id,
		});
		await addedServer.save((e) => {
			if (!e) return interaction.reply({ embeds: [successEmbed(`Pomyślnie dodano serwer o ID: \`${serverId}\` do whitelisty.`)] }).catch(console.error);
			if (e.code && e.code === 11000) return interaction.reply({ embeds: [errorEmbed(`Serwer o ID: \`${serverId}\` jest już na whiteliście tego serwera.`)] }).catch(console.error);
			return interaction.reply({ embeds: [errorEmbed(`Przy dodawaniu serwera o ID: \`${serverId}\` wystąpił nieznany błąd.`)] }).catch(console.error);
		});
	},
};