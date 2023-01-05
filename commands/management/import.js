import { SlashCommandBuilder } from 'discord.js';
import { fetch } from 'undici';
import CustomCommands from '../../models/CustomCommands.js';
import { addCustomCommands } from '../../utils/customCommands.js';

const saveCommands = async (commands, guild) => {
	const commandIds = await addCustomCommands(commands, guild);
	commands.forEach((command, i) => {
		command.command_id = commandIds[i];
		command.save();
	});
};

export default {
	...new SlashCommandBuilder()
		.setName('import')
		.setDescription('Importuj masowo komendy')
		.addAttachmentOption(attachment =>
			attachment.setName('plik')
				.setDescription('Plik zawierający strukture komend')
				.setRequired(true),
		)
		.toJSON(),
	async execute(interaction) {
		await interaction.deferReply();

		const fileRequest = await fetch(interaction.options.getAttachment('plik').url);

		let content;
		try {
			content = JSON.parse(await fileRequest.text());
		} catch (e) {
			return interaction.editReply({ content: 'Podany plik nie jest poprawnym plikiem z komendami!' });
		}

		const guild = await interaction.client.guilds.cache.get(content?.at(0).parent_server_id);

		if (!guild) {
			return interaction.editReply({ content: 'Nie mogę odnaleźć serwera na który chcesz zimportować komendy!' });
		}

		const oldCommands = await CustomCommands.find({ parent_server_id: guild.id }).exec();

		CustomCommands.insertMany(content)
			.then(async commands => {
				await saveCommands([...oldCommands, ...commands], guild);
				await interaction.editReply({ content: 'Pomyślnie zaimportowano komendy!' });
			})
			.catch(e => {
				console.error(e);
				interaction.editReply({ content: 'Wystąpił problem podczas importowania komend!' });
			});
	},
};
