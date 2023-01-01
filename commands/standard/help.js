import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import CustomCommands from '../../models/CustomCommands.js';

export default {
	...new SlashCommandBuilder()
		.setName('help')
		.setDescription('Pokazuje menu z komendami')
		.toJSON(), async execute(interaction) {
		const commands = await CustomCommands.find({ parent_server_id: interaction.guild.id });

		const generateEmbed = (start) => {
			const partOfCommands = commands.slice(start, start + 25);

			const embed = new EmbedBuilder()
				.setTitle('Dostępne komendy serwerowe')
				.setDescription(`**Strona ${Math.floor(start / 25) + 1}/${Math.ceil(commands.length / 25)}**`)
				.setColor(0x224d21);

			const fields = partOfCommands.map(cmd => ({
				name: cmd.command_name, value: cmd.command_description, inline: true,
			}));

			embed.addFields(...fields);

			return embed;
		};
		const getAllCommandsEmbeds = () => {
			let currentIndex = 0, arr = [];
			if (commands.length === 0) {
				return [new EmbedBuilder().setDescription('Brak komend.').setColor(0x224d21)];
			}
			while (currentIndex < commands.length) {
				arr.push(generateEmbed(currentIndex));
				currentIndex += 25;
			}
			return arr;
		};

		return interaction.reply({ embeds: getAllCommandsEmbeds(), ephemeral: true });
	},
};
