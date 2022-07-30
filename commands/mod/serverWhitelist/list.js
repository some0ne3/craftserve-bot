import { EmbedBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import WhitelistedServers from '../../../models/WhitelistedServers.js';

export default {
	...new SlashCommandSubcommandBuilder()
		.setName('list')
		.setDescription('Wyświetla whitelistę antyInvite.')
		.toJSON(),
	async execute(interaction) {
		const wlList = WhitelistedServers.find({ parent_server_id: interaction.guild?.id }).exec();
		const strings = (await wlList).map((srv, i) => `${i + 1}. \`${srv.whitelisted_server_id}\``);
		const desc = strings.length > 0 ? strings.join('\n') : 'Brak.';
		const embed = new EmbedBuilder()
			.setDescription(desc)
			.setTitle(`Serwery na whiteliście ${interaction.guild.name}`)
			.setTimestamp();
		return await interaction.reply({ embeds: [embed] }).catch(console.error);
	},
};