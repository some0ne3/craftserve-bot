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
						.addChoice('server_whitelist', 'server_whitelist')
						.addChoice('punishment', 'punishment')
						.setRequired(true),
				),
		)
		.addSubcommand(o =>
			o.setName('antyphishing')
				.setDescription('Edycja ustawień antyPhishing')
				.addStringOption(string =>
					string.setName('setting')
						.setDescription('Do czego chcesz dodać podaną wartość?')
						.addChoice('server_whitelist', 'server_whitelist')
						.addChoice('punishment', 'punishment')
						.setRequired(true),
				),
		)
		.toJSON(),
	async execute(interaction) {
		interaction.reply(JSON.stringify(interaction.options));

	},
};