import { SlashCommandSubcommandGroupBuilder } from '@discordjs/builders';

export default {
	...new SlashCommandSubcommandGroupBuilder()
		.setName('add')
		.setDescription('Dodawanie do list w ustawieniach.')
		.addSubcommand(o =>
			o.setName('antyinvite')
				.setDescription('Edycja ustawień antyInvite')
				.addStringOption(string =>
					string.setName('setting')
						.setDescription('Do czego chcesz dodać podaną wartość?')
						.addChoices(
							{ name: 'server_whitelist', value: 'server_whitelist' },
							{ name: 'punishment', value: 'punishment' },
						)
						.setRequired(true),
				),
		)
		.addSubcommand(o =>
			o.setName('antyphishing')
				.setDescription('Edycja ustawień antyPhishing')
				.addStringOption(string =>
					string.setName('setting')
						.setDescription('Do czego chcesz dodać podaną wartość?')
						.addChoices(
							{ name: 'server_whitelist', value: 'server_whitelist' },
							{ name: 'punishment', value: 'punishment' },
						)
						.setRequired(true),
				),
		)
		.toJSON(),
	async execute(interaction) {
		interaction.reply(JSON.stringify(interaction.options));

	},
};