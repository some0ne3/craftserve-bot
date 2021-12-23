import CustomCommands from '../../../models/CustomCommands.js';
import { errorEmbed, successEmbed } from '../../../utils/embeds.js';
import { SlashCommandSubcommandGroupBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

export default {
	...new SlashCommandSubcommandGroupBuilder()
		.setName('edit')
		.setDescription('Pozwala na edytowanie customowej komendy.')
		.addSubcommand(o =>
			o.setName('simple_embed')
				.setDescription('Prosty embed')
				.addStringOption(string =>
					string.setName('cmd_name')
						.setDescription('Nazwa edytowanej do dodania')
						.setRequired(true)
						.setAutocomplete(true),
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
						.setDescription('Nazwa komendy do dodania')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('message_content')
						.setDescription('Tresć wiadomości nad embedem')
						.setRequired(false),
				),
		)
		.addSubcommand(o =>
			o.setName('rich_embed')
				.setDescription('Zawansowany embed')
				.addStringOption(string =>
					string.setName('cmd_name')
						.setDescription('Nazwa edytowanej komendy')
						.setRequired(true)
						.setAutocomplete(true),
				)
				.addStringOption(string =>
					string.setName('cmd_desc')
						.setDescription('Opis komendy do dodania')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('embed_json')
						.setDescription('Tytuł embeda komendy')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('message_content')
						.setDescription('Tresć wiadomości nad embedem')
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
						.setDescription('Opis komendy do dodania')
						.setRequired(true),
				)
				.addStringOption(string =>
					string.setName('message_content')
						.setDescription('Treść wiadomości')
						.setRequired(true),
				),
		)
		.toJSON(),
	async execute(interaction) {

		const editAppCommand = async (id, command) => {
			interaction.guild?.commands.edit(id, {
				name: command.command_name,
				description: command.command_description,
				options: [
					{
						'name': 'tekst',
						'description': 'Tekst wyświetlany przed odpowiedzią bota',
						'type': 3,
						'required': false,
					},
				],
			});
		};

		const editCommand = async (commandName, newCommand) => {
			await editAppCommand((await CustomCommands.findOne({
				command_name: commandName,
				parent_server_id: interaction.guild?.id,
			})).command_id, newCommand);
			CustomCommands.updateOne({
				command_name: commandName,
				parent_server_id: interaction.guild?.id,
			}, newCommand).exec().then((res) => {
				if (res.ok === 1 && res.nModified > 0) {
					return interaction.reply({ embeds: [successEmbed(`Pomyślnie edytowano: \`${commandName}\` .`)] });
				}
				return interaction.reply({ embeds: [errorEmbed(`Wśród komend tego serwera nie ma: \`${commandName}\`.`)] });
			}, (res) => {
				console.error(res);
				return interaction.reply({ embeds: [errorEmbed(`Podczas edytowania komendy: \`${commandName}\` wystąpił nieznany błąd.`)] });
			});
		};

		const commandName = interaction.options.getString('cmd_name');
		const commandDescription = interaction.options.getString('cmd_desc');

		switch (interaction.options.getSubcommand()) {
		case 'simple_embed':
			const simpleTitle = interaction.options.getString('embed_title');
			const simpleDescription = interaction.options.getString('embed_content');
			const simpleMessage = interaction.options.getString('message_content');
			const simpleEmbed = new MessageEmbed()
				.setTitle(simpleTitle)
				.setDescription(simpleDescription);
			const simpleEmbedCommand = {
				command_name: commandName,
				command_description: commandDescription,
				parent_server_id: interaction.guild?.id,
				command_content: simpleMessage,
				embed_json: JSON.stringify(simpleEmbed.toJSON()),
			};
			await editCommand(commandName, simpleEmbedCommand);
			break;
		case 'rich_embed':
			const rich_json = interaction.options.getString('embed_json');
			const rich_message = interaction.options.getString('message_content');
			const richEmbed = new MessageEmbed(JSON.parse(rich_json));
			const richEmbedCommand = {
				command_name: commandName,
				command_description: commandDescription,
				parent_server_id: interaction.guild?.id,
				command_content: rich_message,
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
			};
			await editCommand(commandName, messageCommand);
			break;
		}
	},
};