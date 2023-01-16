import { SlashCommandSubcommandBuilder } from 'discord.js';
import { errorEmbed, successEmbed } from '../../../utils/embeds.js';
import ServerSettings from '../../../models/ServerSettings.js';
import Duration from 'duration-js';

export default {
	...new SlashCommandSubcommandBuilder()
		.setName('timeout')
		.setDescription('Pozwala na ustawienie długości przerwy po wysłaniu zaproszenia')
		.addStringOption(string =>
			string.setName('setting')
				.setDescription('Wybranie edytowanego ustawienia')
				.addChoices(
					{ name: 'antyInvite', value: 'anty_invite_timeout' },
				)
				.setRequired(true),
		)
		.addStringOption(string =>
			string.setName('timeout_duration')
				.setDescription('Długość przerwy np. 1d15h28m, maksymalnie 28d')
				.setRequired(true),
		)
		.toJSON(),
	async execute(interaction) {
		const setting = interaction.options.getString('setting');
		const timeoutDuration = interaction.options.getString('timeout_duration');
		try {
			const parsedDuration = Duration.parse(timeoutDuration);
			if (parsedDuration.days() >= 28 || parsedDuration.milliseconds() < 0) {
				return interaction.reply({
					embeds: [
						errorEmbed('Czas przerwy nie może być dłuższy niż 28 dni ani mniejszy niż 0.'),
					], ephemeral: true }).catch(console.error);
			}
		} catch (e) {
			return interaction.reply({
				embeds: [
					errorEmbed('Czas przerwy nie jest prawidłowy.'),
				], ephemeral: true }).catch(console.error);
		}

		let serverSettings = await ServerSettings.findOne({ server_id: interaction.guild?.id });

		if (!serverSettings) {
			serverSettings = new ServerSettings({ server_id: interaction.guild?.id, [setting]: timeoutDuration });
		} else {
			serverSettings[setting] = timeoutDuration;
		}

		await serverSettings.save((e) => {
			if (!e) return interaction.reply({ embeds: [successEmbed(`Pomyślnie zmodyfikowano ustawienie: \`${setting}\`.`)] }).catch(console.error);
			return interaction.reply({ embeds: [errorEmbed(`Przy modyfikacji ustawienia: \`${setting}\` wystąpił nieznany błąd.`)] }).catch(console.error);
		});

	},
};