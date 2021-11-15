import CustomCommands from '../../models/CustomCommands.js';
import { MessageEmbed } from 'discord.js';
import { errorEmbed, successEmbed } from '../../utils/embeds.js';

export default {
	name: 'customcommand',
	description: 'Zarządzanie customowymi komendami.',
	options: [
		{
			type: 2,
			name: 'add',
			description: 'Pozwala na dodanie customowej komendy na serwer.',
			options: [
				{
					type: 1,
					name: 'simple_embed',
					description: 'Prosty embed',
					options: [
						{
							type: 3,
							name: 'cmd_name',
							description: 'Nazwa komendy do dodania',
							required: true,
						},
						{
							type: 3,
							name: 'cmd_desc',
							description: 'Opis komendy do dodania',
							required: true,
						},
						{
							type: 3,
							name: 'embed_title',
							description: 'Tytuł embeda komendy',
							required: true,
						},
						{
							type: 3,
							name: 'embed_content',
							description: 'Zawartość tekstowa embeda',
							required: true,
						},
						{
							type: 3,
							name: 'message_content',
							description: 'Treść wiadomości nad embedem',
							required: false,
						},
					],
				},
				{
					type: 1,
					name: 'rich_embed',
					description: 'Zaawansowany embed',
					options: [
						{
							type: 3,
							name: 'cmd_name',
							description: 'Nazwa komendy do dodania',
							required: true,
						},
						{
							type: 3,
							name: 'cmd_desc',
							description: 'Opis komendy do dodania',
							required: true,
						},
						{
							type: 3,
							name: 'embed_json',
							description: 'JSON embeda',
							required: true,
						},
						{
							type: 3,
							name: 'message_content',
							description: 'Treść wiadomości nad embedem',
							required: false,
						},
					],
				},
				{
					type: 1,
					name: 'no_embed',
					description: 'Sama treść, bez embeda',
					options: [
						{
							type: 3,
							name: 'cmd_name',
							description: 'Nazwa komendy do dodania',
							required: true,
						},
						{
							type: 3,
							name: 'cmd_desc',
							description: 'Opis komendy do dodania',
							required: true,
						},
						{
							type: 3,
							name: 'message_content',
							description: 'Treść wiadomości',
							required: true,
						},
					],
				},
			],
		},
		{
			type: 2,
			name: 'edit',
			description: 'Pozwala na edytowanie customowej komendy.',
			options: [
				{
					type: 1,
					name: 'simple_embed',
					description: 'Prosty embed',
					options: [
						{
							type: 3,
							name: 'cmd_name',
							description: 'Nazwa edytowanej komendy',
							required: true,
							choices: [],
						},
						{
							type: 3,
							name: 'cmd_desc',
							description: 'Opis komendy do dodania',
							required: true,
						},
						{
							type: 3,
							name: 'embed_title',
							description: 'Tytuł embeda komendy',
							required: true,
						},
						{
							type: 3,
							name: 'embed_content',
							description: 'Zawartość tekstowa embeda',
							required: true,
						},
						{
							type: 3,
							name: 'message_content',
							description: 'Treść wiadomości nad embedem',
							required: false,
						},
					],
				},
				{
					type: 1,
					name: 'rich_embed',
					description: 'Zaawansowany embed',
					options: [
						{
							type: 3,
							name: 'cmd_name',
							description: 'Nazwa edytowanej komendy',
							required: true,
							choices: [],
						},
						{
							type: 3,
							name: 'cmd_desc',
							description: 'Opis komendy do dodania',
							required: true,
						},
						{
							type: 3,
							name: 'embed_json',
							description: 'JSON embeda',
							required: true,
						},
						{
							type: 3,
							name: 'message_content',
							description: 'Treść wiadomości nad embedem',
							required: false,
						},
					],
				},
				{
					type: 1,
					name: 'no_embed',
					description: 'Sama treść, bez embeda',
					options: [
						{
							type: 3,
							name: 'cmd_name',
							description: 'Nazwa edytowanej komendy',
							required: true,
							choices: [],
						},
						{
							type: 3,
							name: 'cmd_desc',
							description: 'Opis komendy do dodania',
							required: true,
						},
						{
							type: 3,
							name: 'message_content',
							description: 'Treść wiadomości',
							required: true,
						},
					],
				},
			],
		},
		{
			type: 1,
			name: 'remove',
			description: 'Pozwala na usunięcie customowej komendy z serwera.',
			options: [
				{
					type: 3,
					name: 'cmd_name',
					description: 'Nazwa komendy do usunięcia',
					required: true,
					choices: [],
				},
			],
		},
		{
			type: 1,
			name: 'list',
			description: 'Wyświetla listę customowych komend obecnego serwera.',
		},
		{
			type: 1,
			name: 'reload',
			description: 'Odświeża komendy, lub pojedynczą komendę.',
			options: [
				{
					type: 3,
					name: 'cmd_name',
					description: 'Nazwa komendy do odświeżenia',
					required: false,
					choices: [],
				},
			],

		},
	],
	async execute(interaction) {
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
		const cmdList = CustomCommands.find({ parent_server_id: interaction.guild?.id }).exec();

		const firstSub = interaction.options.getSubcommandGroup(false) ?? interaction.options.getSubcommand();

		switch (firstSub) {
		case 'add':
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
			break;
		case 'edit':
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
			break;
		case 'remove':
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
			break;
		case 'list':
			let strings = (await cmdList).map((cmd, i) => `${i + 1}. \`${cmd.command_name}\``);
			let desc = strings.length > 0 ? strings.join('\n') : 'Brak.';
			let embed = new MessageEmbed()
				.setDescription(desc)
				.setTitle(`Komendy w ${interaction.guild.name}`)
				.setTimestamp();
			return await interaction.reply({ embeds: [embed] });
		case 'reload':
			const currentApplicationCommands = interaction.guild.commands.cache;
			console.log(currentApplicationCommands);
			/*
						const customCommands = (await cmdList).map(command => ({
							name: command.command_name,
							description: command.command_description,
							options: [
								{
									"name": "tekst",
									"description": "Tekst wyświetlany przed odpowiedzią bota",
									"type": 3,
									"required": false,
								},
							],
						}))
			*/
		}
	},
};