import { SlashCommandSubcommandBuilder } from 'discord.js';
import { errorEmbed, successEmbed } from '../../../utils/embeds.js';
import ServerSettings from '../../../models/ServerSettings.js';

export default {
	...new SlashCommandSubcommandBuilder()
		.setName('toggle')
		.setDescription('Pozwala na wyłączenie lub włączenie filtra')
		.addStringOption(string =>
			string.setName('setting')
				.setDescription('Wybranie edytowanego ustawienia')
				.addChoices(
					{ name: 'antyPhishing', value: 'anty_phishing_enabled' },
					{ name: 'antyInvite', value: 'anty_invite_enabled' },
				)
				.setRequired(true),
		)
		.addBooleanOption(boolean =>
			boolean.setName('enabled')
				.setDescription('Pozwala na wyłączenie lub włączenie filtra')
				.setRequired(true),
		)
		.toJSON(),
	async execute(interaction) {
		const setting = interaction.options.getString('setting');
		const value = interaction.options.getBoolean('enabled');

		let serverSettings = await ServerSettings.findOne({ server_id: interaction.guild?.id });

		if (!serverSettings) {
			serverSettings = new ServerSettings({ server_id: interaction.guild?.id, [setting]: value });
		} else {
			serverSettings[setting] = value;
		}

		await serverSettings.save((e) => {
			if (!e) return interaction.reply({ embeds: [successEmbed(`Pomyślnie zmodyfikowano ustawienie: \`${setting}\`.`)] }).catch(console.error);
			return interaction.reply({ embeds: [errorEmbed(`Przy modyfikacji ustawienia: \`${setting}\` wystąpił nieznany błąd.`)] }).catch(console.error);
		});

	},
};