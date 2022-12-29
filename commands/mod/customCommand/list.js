import { EmbedBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import CustomCommands from '../../../models/CustomCommands.js';

export default {
	...new SlashCommandSubcommandBuilder()
		.setName('list')
		.setDescription('Wyświetla listę komend z treścią obecnego serwera.')
		.toJSON(),
	async execute(interaction) {
		const cmdList = CustomCommands.find({ parent_server_id: interaction.guild?.id }).exec();

		const strings = (await cmdList).map((cmd, i) => `${i + 1}. \`${cmd.command_name}\``);
		const desc = strings.length > 0 ? strings.join('\n') : 'Brak.';
		const embed = new EmbedBuilder()
			.setDescription(desc)
			.setTitle(`Komendy serwera ${interaction.guild.name}`)
			.setTimestamp();
		return await interaction.reply({ embeds: [embed] }).catch(console.error);
	},
};