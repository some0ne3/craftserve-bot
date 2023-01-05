import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
	...new SlashCommandBuilder()
		.setName('google')
		.setDescription('Zaprowadzi Cię do rozwiązania problemu')
		.addStringOption(string =>
			string.setName('content')
				.setDescription('Słowa które chcesz wyszukać')
				.setRequired(true),
		)
		.toJSON(),
	async execute(interaction) {
		const splitted = interaction.options.getString('content').split(' ');

		const regexp = new RegExp('<[@#!&](.*?)>', 'g');
		const mentions = [], searchedWords = [];

		splitted.forEach(word => {
			if (regexp.test(word)) {
				return mentions.push(word);
			}
			word && searchedWords.push(word);
		});

		const searchString = searchedWords.join('+').replaceAll('\n', '+');

		const link = `https://letmegooglethat.com/?q=${searchString}`;
		const embed = new EmbedBuilder()
			.setColor(0x224d21)
			.setTitle('Google')
			.setDescription(`[${link}](${link})`);
		return interaction.reply({ embeds: [embed], content: mentions.join('') });
	},
};
