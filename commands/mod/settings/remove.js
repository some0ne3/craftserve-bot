import { SlashCommandSubcommandGroupBuilder } from 'discord.js';

export default {
	...new SlashCommandSubcommandGroupBuilder()
		.setName('remove')
		.setDescription('Dodawanie do list w ustawieniach.')
		.addSubcommand(o =>
			o.setName('antyinvite')
				.setDescription('Edycja ustawień antyInvite')
				.addStringOption(string =>
					string.setName('setting')
						.setDescription('Z czego chcesz usunąć podaną wartość?')
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
						.setDescription('Z czego chcesz usunąć podaną wartość?')
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