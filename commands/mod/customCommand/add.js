import CustomCommands from '../../../models/CustomCommands.js';
import { errorEmbed, successEmbed } from '../../../utils/embeds.js';
import { SlashCommandSubcommandGroupBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

export default {
	...new SlashCommandSubcommandGroupBuilder()
		.setName('add')
		.setDescription('Pozwala na dodanie customowej komendy na serwer.')
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
				),
		)
		.toJSON(),
	async execute(interaction) {
		const saveCommand = async (command) => {
			command.command_id = await addAppCommand(command);
			await command.save((e) => {
				if (!e) {
					return interaction.reply({ embeds: [successEmbed(`Pomyślnie dodano: \`${commandName}\` do customowych komend.`)] });
				}
				if (e.code && e.code === 11000) return interaction.reply({ embeds: [errorEmbed(`Komenda: \`${commandName}\` jest już wśród komend tego serwera.`)] });
				return interaction.reply({ embeds: [errorEmbed(`Przy dodawaniu komendy: \`${commandName}\` wystąpił nieznany błąd.`)] });
			});
		};

		const addAppCommand = async (command) => {
			return (await interaction.guild?.commands.create({
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
			})).id;
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
			const simpleEmbedCommand = new CustomCommands({
				command_name: commandName,
				command_description: commandDescription,
				parent_server_id: interaction.guild?.id,
				command_content: simpleMessage,
				embed_json: JSON.stringify(simpleEmbed.toJSON()),
			});
			await saveCommand(simpleEmbedCommand);
			break;
		case 'rich_embed':
			const rich_json = interaction.options.getString('embed_json');
			const rich_message = interaction.options.getString('message_content');
			const richEmbed = new MessageEmbed(JSON.parse(rich_json));
			const richEmbedCommand = new CustomCommands({
				command_name: commandName,
				command_description: commandDescription,
				parent_server_id: interaction.guild?.id,
				command_content: rich_message,
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
				command_content: message,
			});
			await saveCommand(messageCommand);
			break;
		}
	},
};