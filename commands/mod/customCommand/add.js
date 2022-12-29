import { SlashCommandSubcommandGroupBuilder } from 'discord.js';
import CustomCommands from '../../../models/CustomCommands.js';
import { EmbedBuilder, errorEmbed, successEmbed } from '../../../utils/embeds.js';
import { addCustomCommand } from '../../../utils/customCommands.js';

export default {
	...new SlashCommandSubcommandGroupBuilder()
		.setName('add')
		.setDescription('Pozwala na dodanie komendy z treścią na serwer.')
		.addSubcommand(o =>
			o.setName('simple_embed')
				.setDescription('Prosty embed')
				.addStringOption(string =>
					string.setName('cmd_name')
						.setDescription('Nazwa komendy do dodania')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('cmd_desc')
						.setDescription('Opis komendy do dodania')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('embed_title')
						.setDescription('Tytuł embeda komendy')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('embed_content')
						.setDescription('Zawartość embeda komendy')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('message_content')
						.setDescription('Tresć wiadomości nad embedem')
						.setRequired(false),
				)
				.addBooleanOption(boolean =>
					boolean.setName('copy_user_input')
						.setDescription('Czy bot powinien wpisywać podaną przez użytkownika treść przed odpowiedzią?')
						.setRequired(false),
				),
		)
		.addSubcommand(o =>
			o.setName('rich_embed')
				.setDescription('Zawansowany embed')
				.addStringOption(string =>
					string.setName('cmd_name')
						.setDescription('Nazwa komendy do dodania')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('cmd_desc')
						.setDescription('Opis komendy do dodania')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('embed_json')
						.setDescription('JSON embeda komendy')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('message_content')
						.setDescription('Tresć wiadomości nad embedem')
						.setRequired(false),
				)
				.addBooleanOption(boolean =>
					boolean.setName('copy_user_input')
						.setDescription('Czy bot powinien wpisywać podaną przez użytkownika treść przed odpowiedzią?')
						.setRequired(false),
				),
		)
		.addSubcommand(o =>
			o.setName('no_embed')
				.setDescription('Sama treść, bez embeda')
				.addStringOption(string =>
					string.setName('cmd_name')
						.setDescription('Nazwa komendy do dodania')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('cmd_desc')
						.setDescription('Opis komendy do dodania')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('message_content')
						.setDescription('Treść wiadomości')
						.setRequired(true),
				)
				.addBooleanOption(boolean =>
					boolean.setName('copy_user_input')
						.setDescription('Czy bot powinien wpisywać podaną przez użytkownika treść przed odpowiedzią?')
						.setRequired(false),
				),
		)
		.toJSON(),
	async execute(interaction) {

		await interaction.deferReply();

		const saveCommand = async (command) => {
			command.command_id = await addCustomCommand(command, interaction.guild);
			await command.save((e) => {
				if (!e) {
					return interaction.editReply({ embeds: [successEmbed(`Pomyślnie dodano: \`${commandName}\` do komend.`)] }).catch(console.error);
				}
				if (e.code && e.code === 11000) return interaction.editReply({ embeds: [errorEmbed(`Komenda: \`${commandName}\` jest już wśród komend tego serwera.`)] }).catch(console.error);
				return interaction.editReply({ embeds: [errorEmbed(`Przy dodawaniu komendy: \`${commandName}\` wystąpił nieznany błąd.`)] }).catch(console.error);
			});
		};


		const commandName = interaction.options.getString('cmd_name').toLowerCase();
		const commandDescription = interaction.options.getString('cmd_desc');
		const copyUserInput = interaction.options.getBoolean('copy_user_input');

		switch (interaction.options.getSubcommand()) {
		case 'simple_embed':
			const simpleTitle = interaction.options.getString('embed_title');
			const simpleDescription = interaction.options.getString('embed_content');
			const simpleMessage = interaction.options.getString('message_content');
			const simpleEmbed = new EmbedBuilder()
				.setTitle(simpleTitle)
				.setDescription(simpleDescription);
			const simpleEmbedCommand = new CustomCommands({
				command_name: commandName,
				command_description: commandDescription,
				parent_server_id: interaction.guild?.id,
				command_content: simpleMessage,
				copy_user_input: copyUserInput,
				embed_json: JSON.stringify(simpleEmbed.toJSON()),
			});
			await saveCommand(simpleEmbedCommand);
			break;
		case 'rich_embed':
			const rich_json = interaction.options.getString('embed_json');
			const rich_message = interaction.options.getString('message_content');
			let parsed;
			try {
				parsed = JSON.parse(rich_json);
			} catch (e) {
				if (e.name !== 'SyntaxError') return console.error(e);
				return interaction.editReply({
					embeds: [errorEmbed(`Podany JSON zawiera błędy:\n\`${e.message}\``)],
				}).catch(console.error);
			}
			const richEmbed = new EmbedBuilder(JSON.parse(rich_json));
			if (!richEmbed.isValid()) {
				return interaction.editReply({
					embeds: [errorEmbed('Podany embed przekracza limity discord lub jest pusty.')],
				}).catch(console.error);
			}
			const richEmbedCommand = new CustomCommands({
				command_name: commandName,
				command_description: commandDescription,
				parent_server_id: interaction.guild?.id,
				command_content: rich_message,
				copy_user_input: copyUserInput,
				embed_json: JSON.stringify(richEmbed.toJSON()),
			});
			await saveCommand(richEmbedCommand);
			break;
		case 'no_embed':
			const message = interaction.options.getString('message_content');
			const messageCommand = new CustomCommands({
				command_name: commandName,
				command_description: commandDescription,
				parent_server_id: interaction.guild?.id,
				copy_user_input: copyUserInput,
				command_content: message,
			});
			await saveCommand(messageCommand);
			break;
		}
	},
};