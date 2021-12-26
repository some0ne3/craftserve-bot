import { SlashCommandSubcommandGroupBuilder } from '@discordjs/builders';

export default {
	...new SlashCommandSubcommandGroupBuilder()
		.setName('list')
		.setDescription('Dodawanie do list w ustawieniach.')
		.addSubcommand(o =>
			o.setName('antyinvite')
				.setDescription('Wyświetla listę dodanych wyjątków'),
		)
		.addSubcommand(o =>
			o.setName('antyphishing')
				.setDescription('Wyświetla listę dodanych wyjątków'),
		)
		.toJSON(),
	async execute(interaction) {
		interaction.reply(JSON.stringify(interaction.options));

	},
};