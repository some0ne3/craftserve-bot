import { SlashCommandSubcommandBuilder } from 'discord.js';
import { errorEmbed, successEmbed } from '../../../utils/embeds.js';
import ServerSettings from '../../../models/ServerSettings.js';

export default {
	...new SlashCommandSubcommandBuilder()
		.setName('help_category')
		.setDescription('Pozwala na ustawienie kategorii pomocy')
		.addChannelOption(string =>
			string.setName('category')
				.setDescription('Wybierz kategorię pomocy')
				.addChannelTypes(4)
				.setRequired(true),
		)
		.toJSON(),
	async execute(interaction) {
		const category = interaction.options.getChannel('help_category');

		let serverSettings = await ServerSettings.findOne({ server_id: interaction.guild?.id });

		if (!serverSettings) {
			serverSettings = new ServerSettings({ server_id: interaction.guild?.id, help_category: category.id });
		} else {
			serverSettings.help_category = category.id;
		}

		await serverSettings.save((e) => {
			if (!e) return interaction.reply({ embeds: [successEmbed('Pomyślnie zmodyfikowano kategorię z kanałami pomocy.')] }).catch(console.error);
			return interaction.reply({ embeds: [errorEmbed('Wystąpił nieznany błąd podczas modyfikacji kategorii z kanałami pomocy')] }).catch(console.error);
		});

	},
};
