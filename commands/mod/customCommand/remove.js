import CustomCommands from '../../../models/CustomCommands.js';
import { errorEmbed, successEmbed } from '../../../utils/embeds.js';
import { SlashCommandSubcommandBuilder } from '@discordjs/builders';

export default {
	...new SlashCommandSubcommandBuilder()
		.setName('remove')
		.setDescription('Pozwala na usunięcie customowej komendy z serwera.')
		.addStringOption(o =>
			o.setName('cmd_name')
				.setDescription('Nazwa komendy do usunięcia')
				.setRequired(true)
				.setAutocomplete(true))
		.toJSON(),
	async execute(interaction) {
		const commandName = interaction.options.getString('cmd_name');
		//todo deleting command from discord api
		CustomCommands.deleteOne({
			command_name: commandName,
			parent_server_id: interaction.guild?.id,
		}).exec().then((res) => {
			if (res.ok === 1 && res.deletedCount > 0) return interaction.reply({ embeds: [successEmbed(`Pomyślnie usunięto: \`${commandName}\` z customowych komend.`)] });
			return interaction.reply({ embeds: [errorEmbed(`Wśród komend tego serwera nie ma: \`${commandName}\`.`)] });
		}, (res) => {
			console.error(res);
			return interaction.reply({ embeds: [errorEmbed(`Podczas usuwania komendy: \`${commandName}\` wystąpił nieznany błąd.`)] });
		});
	},
};