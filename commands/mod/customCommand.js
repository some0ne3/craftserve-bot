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
				},
			],
		},
		{
			type: 1,
			name: 'list',
			description: 'Wyświetla listę customowych komend obecnego serwera.',
		},
		//todo add edit subcommand
	],
	async execute(interaction) {
		const commandName = interaction.options.getString('cmd_name');

		switch (interaction.options.getSubcommand()) { // todo support and handling subcommandgroup for 'add' and subcommand for the rest
		case 'add':
			const addedCommand = new CustomCommands({
				command_name: commandName,
				parent_server_id: interaction.guild?.id,
			});
			// todo add command_content and embed json to db
			await addedCommand.save((e) => {
				if (!e) return interaction.reply({ embeds: [successEmbed(`Pomyślnie dodano: \`${commandName}\` do customowych komend.`)] });
				if (e.code && e.code === 11000) return interaction.reply({ embeds: [errorEmbed(`Komenda: \`${commandName}\` jest już wśród komend tego serwera.`)] });
				return interaction.reply({ embeds: [errorEmbed(`Przy dodawaniu komendy: \`${commandName}\` wystąpił nieznany błąd.`)] });
			});
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
			const cmdList = CustomCommands.find({ parent_server_id: interaction.guild?.id }).exec();
			let strings = (await cmdList).map((cmd, i) => `${i + 1}. \`${cmd.command_name}\``);
			let desc = strings.length > 0 ? strings.join('\n') : 'Brak.';
			let embed = new MessageEmbed()
				.setDescription(desc)
				.setTitle(`Komendy w ${interaction.guild.name}`)
				.setTimestamp();
			return await interaction.reply({ embeds: [embed] });
		}
	},
};