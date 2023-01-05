import { SlashCommandBuilder } from 'discord.js';

export default {
	...new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Restartuje bota')
		.toJSON(),
	async execute(interaction) {
		interaction.reply({ content: 'Trwa restartowanie bota!', ephemeral: true }).then(() => {
			process.exit(0);
		});
	},
};
