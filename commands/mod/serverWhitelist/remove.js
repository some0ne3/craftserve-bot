import { errorEmbed, successEmbed } from '../../../utils/embeds.js';
import { SlashCommandSubcommandBuilder } from '@discordjs/builders';
import WhitelistedServers from '../../../models/WhitelistedServers.js';

export default {
	...new SlashCommandSubcommandBuilder()
		.setName('remove')
		.setDescription('Pozwala na usunięcie serwera z whitelisty antyInvite.')
		.addStringOption(string =>
			string.setName('server_id')
				.setDescription('Serwer do usunięcia z whitelisty antyInvite')
				.setRequired(true))
		.toJSON(),
	async execute(interaction) {
		const serverId = interaction.options.getString('server_id');

		WhitelistedServers.deleteOne({
			whitelisted_server_id: serverId,
			parent_server_id: interaction.guild?.id,
		}).exec().then((res) => {
			if (res.ok === 1 && res.deletedCount > 0) return interaction.reply({ embeds: [successEmbed(`Pomyślnie usunięto serwer o ID: \`${serverId}\` z whitelisty.`)] }).catch(console.error);
			return interaction.reply({ embeds: [errorEmbed(`Na whiteliście nie ma serwera o ID: \`${serverId}\`.`)] }).catch(console.error);
		}, (res) => {
			console.error(res);
			return interaction.reply({ embeds: [errorEmbed(`Podczas usuwania serwera o ID: \`${serverId}\` wystąpił nieznany błąd.`)] }).catch(console.error);
		});
	},
};