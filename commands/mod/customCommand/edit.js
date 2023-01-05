import { EmbedBuilder, SlashCommandSubcommandGroupBuilder } from 'discord.js';
import CustomCommands from '../../../models/CustomCommands.js';
import { errorEmbed, successEmbed } from '../../../utils/embeds.js';
import { editCustomCommand } from '../../../utils/customCommands.js';

export default {
	...new SlashCommandSubcommandGroupBuilder()
		.setName('edit')
		.setDescription('Pozwala na edytowanie komendy z treścią.')
		.addSubcommand(o =>
			o.setName('simple_embed')
				.setDescription('Prosty embed')
				.addStringOption(string =>
					string.setName('cmd_name')
						.setDescription('Nazwa edytowanej komendy')
						.setRequired(true)
						.setAutocomplete(true),
				)
				.addStringOption(string =>
					string.setName('cmd_desc')
						.setDescription('Opis edytowanej komendy')
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
						.setDescription('Treść wiadomości nad embedem')
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
				.setDescription('Zaawansowany embed')
				.addStringOption(string =>
					string.setName('cmd_name')
						.setDescription('Nazwa edytowanej komendy')
						.setRequired(true)
						.setAutocomplete(true),
				)
				.addStringOption(string =>
					string.setName('cmd_desc')
						.setDescription('Opis edytowanej komendy')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('embed_json')
						.setDescription('JSON embeda komendy')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('message_content')
						.setDescription('Treść wiadomości nad embedem')
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
						.setDescription('Nazwa edytowanej komendy')
						.setRequired(true)
						.setAutocomplete(true),
				)
				.addStringOption(string =>
					string.setName('cmd_desc')
						.setDescription('Opis edytowanej komendy')
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

		const editCommand = async (commandName, newCommand) => {
			await editCustomCommand((await CustomCommands.findOne({
				command_name: commandName,
				parent_server_id: interaction.guild?.id,
			})).command_id, newCommand, interaction.guild);
			CustomCommands.updateOne({
				command_name: commandName,
				parent_server_id: interaction.guild?.id,
			}, newCommand).exec().then((res) => {
				if (res.ok === 1 && res.nModified > 0) {
					return interaction.reply({ embeds: [successEmbed(`Pomyślnie edytowano: \`${commandName}\` .`)] }).catch(console.error);
				}
				return interaction.reply({ embeds: [errorEmbed(`Wśród komend tego serwera nie ma: \`${commandName}\`.`)] }).catch(console.error);
			}, (res) => {
				console.error(res);
				return interaction.reply({ embeds: [errorEmbed(`Podczas edytowania komendy: \`${commandName}\` wystąpił nieznany błąd.`)] }).catch(console.error);
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
			const simpleEmbedCommand = {
				command_name: commandName,
				command_description: commandDescription,
				parent_server_id: interaction.guild?.id,
				command_content: simpleMessage,
				copy_user_input: copyUserInput,
				embed_json: JSON.stringify(simpleEmbed.toJSON()),
			};
			await editCommand(commandName, simpleEmbedCommand);
			break;
		case 'rich_embed':
			const rich_json = interaction.options.getString('embed_json');
			const rich_message = interaction.options.getString('message_content');
			const richEmbed = new EmbedBuilder(JSON.parse(rich_json));
			const richEmbedCommand = {
				command_name: commandName,
				command_description: commandDescription,
				parent_server_id: interaction.guild?.id,
				command_content: rich_message,
				copy_user_input: copyUserInput,
				embed_json: JSON.stringify(richEmbed.toJSON()),
			};
			await editCommand(commandName, richEmbedCommand);
			break;
		case 'no_embed':
			const message = interaction.options.getString('message_content');
			const messageCommand = {
				command_name: commandName,
				command_description: commandDescription,
				parent_server_id: interaction.guild?.id,
				command_content: message,
				copy_user_input: copyUserInput,
			};
			await editCommand(commandName, messageCommand);
			break;
		}
	},
};