import {
	ActionRowBuilder,
	ModalBuilder, SelectMenuBuilder,
	SlashCommandSubcommandBuilder,
	TextInputBuilder,
	TextInputStyle,
} from 'discord.js';
import CustomCommands from '../../../models/CustomCommands.js';
import { EmbedBuilder, errorEmbed, successEmbed } from '../../../utils/embeds.js';
import { editCustomCommand } from '../../../utils/customCommands.js';

export default {
	...new SlashCommandSubcommandBuilder()
		.setName('editor')
		.setDescription('Pozwala na edytowanie komendy z treścią.')
		.addStringOption(string =>
			string.setName('cmd_name')
				.setDescription('Nazwa edytowanej komendy')
				.setRequired(true)
				.setAutocomplete(true),
		)
		.addStringOption(string =>
			string.setName('type')
				.setDescription('Typ edytora')
				.setRequired(true)
				.addChoices(
					{ name: 'no_embed', value: 'no_embed' },
					{ name: 'simple_embed', value: 'simple_embed' },
					{ name: 'rich_embed', value: 'rich_embed' },
				),
		)
		.toJSON(),
	async execute(interaction) {
		const commandName = interaction.options.getString('cmd_name').toLowerCase();
		const editorType = interaction.options.getString('type');

		const command = await CustomCommands.findOne({
			command_name: commandName,
			parent_server_id: interaction.guild.id,
		}).exec();

		const modalId = `edit-${interaction.user.id}`;
		const parsedJson = JSON.parse(command.embed_json) || '';

		const modal = new ModalBuilder()
			.setCustomId(modalId)
			.setTitle('Edycja komendy');

		const commandDescriptionInput = new TextInputBuilder()
			.setCustomId('cmd_desc')
			.setRequired(true)
			.setMaxLength(100)
			.setLabel('Opis komendy')
			.setStyle(TextInputStyle.Short)
			.setValue(command.command_description);
		const commandDescriptionRow = new ActionRowBuilder().addComponents(commandDescriptionInput);

		const commandMessageInput = new TextInputBuilder()
			.setCustomId('message_content')
			.setRequired(false)
			.setMaxLength(2000)
			.setLabel('Treść wiadomości')
			.setStyle(TextInputStyle.Short)
			.setValue(command.command_content || '');
		const commandMessageRow = new ActionRowBuilder().addComponents(commandMessageInput);

		const commandEmbedTitleInput = new TextInputBuilder()
			.setCustomId('embed_title')
			.setRequired(true)
			.setMaxLength(256)
			.setLabel('Tytuł embeda komendy')
			.setStyle(TextInputStyle.Short)
			.setValue(parsedJson.title || '');
		const commandEmbedTitleRow = new ActionRowBuilder().addComponents(commandEmbedTitleInput);

		const commandEmbedContentInput = new TextInputBuilder()
			.setCustomId('embed_content')
			.setRequired(true)
			.setMaxLength(4000)
			.setLabel('Zawartość embeda komendy')
			.setStyle(TextInputStyle.Paragraph)
			.setValue(parsedJson.description || '');
		const commandEmbedContentRow = new ActionRowBuilder().addComponents(commandEmbedContentInput);

		const commandJsonInput = new TextInputBuilder()
			.setCustomId('embed_json')
			.setRequired(true)
			.setLabel('JSON embeda')
			.setStyle(TextInputStyle.Paragraph)
			.setValue(command.embed_json || '');
		const commandJsonRow = new ActionRowBuilder().addComponents(commandJsonInput);

		modal.addComponents(commandDescriptionRow, commandMessageRow);
		if (editorType === 'simple_embed') {
			modal.addComponents(commandEmbedTitleRow, commandEmbedContentRow);
		} else if (editorType === 'rich_embed') {
			modal.addComponents(commandJsonRow);
		}

		await interaction.showModal(modal);

		const userInputSelect = new SelectMenuBuilder()
			.setCustomId('copy_user_input')
			.setMaxValues(1)
			.setOptions({ value: 'true', label: 'Tak' }, { value: 'false', label: 'Nie' })
			.setPlaceholder('copy_user_input');

		interaction.awaitModalSubmit({
			filter: (modalSubmit) => modalSubmit.customId === modalId,
			time: 5 * 60 * 1000,
		}).then(async modalInteraction => {
			const fields = modalInteraction.fields.fields;
			let embedData = {};

			switch (editorType) {
			case 'simple_embed' : {
				embedData.title = fields.get('embed_title').value;
				embedData.description = fields.get('embed_content').value;
				break;
			}
			case 'rich_embed': {
				embedData = fields.get('embed_json').value;
			}
			}

			try {
				if (typeof embedData === 'string') embedData = JSON.parse(embedData);
			} catch (e) {
				if (e.name !== 'SyntaxError') return console.error(e);
				return modalInteraction.reply({
					embeds: [errorEmbed(`Podany JSON zawiera błędy:\n\`${e.message}\``)],
				}).catch(console.error);
			}

			const embed = new EmbedBuilder(embedData);
			if (!embed.isValid() && editorType !== 'no_embed') {
				return modalInteraction.reply({
					embeds: [errorEmbed('Podany embed przekracza limity discord lub jest pusty.')],
				}).catch(console.error);
			}

			const commandObject = {
				command_name: commandName,
				command_description: fields.get('cmd_desc').value,
				parent_server_id: interaction.guild.id,
				command_content: fields.get('message_content').value,
				embed_json: editorType !== 'no_embed' ? JSON.stringify(embed.toJSON()) : undefined,
			};

			await editCustomCommand(command.command_id, commandObject, interaction.guild);
			CustomCommands.updateOne({
				command_name: commandName,
				parent_server_id: interaction.guild.id,
			}, commandObject).exec()
				.then((res) => {
					if (res.ok === 1 && res.nModified > 0) {
						return modalInteraction.reply({ embeds: [successEmbed(`Pomyślnie edytowano: \`${commandName}\` .`)] }).catch(console.error);
					}
					return modalInteraction.reply({ embeds: [errorEmbed(`Wśród komend tego serwera nie ma: \`${commandName}\`.`)] }).catch(console.error);
				}, (reason) => {
					console.error(reason);
					return modalInteraction.reply({ embeds: [errorEmbed(`Podczas edytowania komendy: \`${commandName}\` wystąpił nieznany błąd.`)] }).catch(console.error);
				});

		}).catch(console.error);

	},
};