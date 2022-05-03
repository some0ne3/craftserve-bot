import CustomCommands from '../../../models/CustomCommands.js';
import { errorEmbed, successEmbed } from '../../../utils/embeds.js';
import { SlashCommandSubcommandBuilder } from '@discordjs/builders';

const deleteHandler = async (interaction, commandName) => {
	await interaction.guild.commands.fetch();

	interaction.guild.commands.cache.find(cmd => cmd.name === commandName).delete();

	return interaction.editReply({ embeds: [successEmbed(`Pomyślnie usunięto: \`${commandName}\` z customowych komend.`)] }).catch(console.error);
};

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
		interaction.deferReply();
		const commandName = interaction.options.getString('cmd_name');
		CustomCommands.deleteOne({
			command_name: commandName,
			parent_server_id: interaction.guild?.id,
		}).exec().then(async (res) => {
			if (res.ok === 1 && res.deletedCount > 0) return await deleteHandler(interaction, commandName);
			return interaction.editReply({ embeds: [errorEmbed(`Wśród komend tego serwera nie ma: \`${commandName}\`.`)] }).catch(console.error);
		}, (res) => {
			console.error(res);
			return interaction.editReply({ embeds: [errorEmbed(`Podczas usuwania komendy: \`${commandName}\` wystąpił nieznany błąd.`)] }).catch(console.error);
		});
	},
};