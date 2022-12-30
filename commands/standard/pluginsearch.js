import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} from 'discord.js';
import { fetch } from 'undici';
import { errorEmbed } from '../../utils/embeds.js';

export default {
	...new SlashCommandBuilder()
		.setName('pluginsearch')
		.setDescription('Pozwoli Ci wyszukać plugin spośród dostępnych na spigotmc.org')
		.addStringOption(string =>
			string.setName('content')
				.setDescription('Plugin który chcesz wyszukać')
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

		const reply = await interaction.deferReply({ fetchReply: true });

		try {
			const spigotURL = 'https://www.spigotmc.org/';
			const resources = await fetch(`https://api.spiget.org/v2/search/resources/${encodeURI(searchedWords.join(' '))}?field=name&sort=-downloads`)
				.then(res => res.json(), console.error);
			const resourcesLength = resources.length;

			if (resourcesLength === 0) return interaction.editReply({ embeds: [errorEmbed('Nie znaleziono żadnych pluginów spełniających kryteria na spigotmc.org.')] });

			let currentIndex = 0;

			const generateEmbed = async (item) => {
				if (!item) return false;
				const resource = await (await fetch(`https://api.spiget.org/v2/resources/${item.id}`)).json();
				const author = await (await fetch(`https://api.spiget.org/v2/authors/${item.author.id}`)).json();
				const category = await (await fetch(`https://api.spiget.org/v2/categories/${item.category.id}`)).json();
				const version = await (await fetch(`https://api.spiget.org/v2/resources/${item.id}/versions/${item.version.id}`)).json();

				const testedVersions = resource.testedVersions.length > 0 ? `\nPrzetestowane wersje: \`${resource.testedVersions.join(', ')}\`` : '';

				const authorIcon = author.icon ? (spigotURL + author.icon.url) : 'https://static.spigotmc.org/styles/spigot/xenforo/avatars/avatar_male_m.png';
				return new EmbedBuilder()
					.setColor(0x224d21)
					.setTitle(resource.name)
					.setAuthor({
						iconURL: authorIcon,
						url: spigotURL + `members/${author.name}.${author.id}`,
						name: author.name || 'Nieznany',
					})
					.setURL(spigotURL + `resources/${resource.id}`)
					.setDescription(resource.tag)
					.addFields({
							name: 'Obecna wersja',
							value: `Wersja \`${version.name}\` \nData wydania: \`${new Date(version.releaseDate * 1000).toLocaleDateString()}\` \n\n**[>>POBIERZ<<](https://api.spiget.org/v2/resources/${resource.id}/versions/${version.id}/download)**\n`,
							inline: true,
						},
						{
							name: 'Informacje',
							value: `Ilość pobrań: \`${resource.downloads}\` \nData wydania: \`${new Date(resource.releaseDate * 1000).toLocaleDateString()}\` \nKategoria: \`${category.name || 'Nieznana'}\` \nOpinie: \`${'⭐'.repeat(resource.rating.average.toFixed())}(${resource.rating.count})\` ${testedVersions}`,
							inline: true,
						},
						{
							name: 'Inne',
							value: `[Pozostałe wersje (${resource.versions.length} wersji)](${spigotURL}resources/${resource.id}/history) \n[Historia zmian (${resource.updates.length} elementów)](${spigotURL}resources/${resource.id}/updates)`,
							inline: false,
						},
					)
					.setThumbnail(resource.icon.url ? (spigotURL + resource.icon.url) : 'https://static.spigotmc.org/styles/spigot/xenresource/resource_icon.png');
			};

			const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setStyle(ButtonStyle.Primary)
						.setEmoji('⬅️')
						.setCustomId('prev')
						.setDisabled(true),
					new ButtonBuilder()
						.setStyle(ButtonStyle.Primary)
						.setEmoji('➡️')
						.setCustomId('next')
						.setDisabled(!(currentIndex + 1 < resourcesLength)),
					new ButtonBuilder()
						.setStyle(ButtonStyle.Danger)
						.setEmoji('🗑️')
						.setCustomId('cancel')
						.setDisabled(false),
				);

			await interaction.editReply({
				content: mentions.join(''),
				embeds: [await generateEmbed(resources[currentIndex])],
				components: [row],
			});

			const collector = await reply.createMessageComponentCollector({
				filter: (componentInteraction) => ['prev', 'next', 'cancel'].includes(componentInteraction.customId) && componentInteraction.user.id === interaction.user.id,
				time: 30000,
			});

			collector.on('collect', async click => {
				collector.resetTimer();
				if (click.customId === 'cancel') {
					click.update({
						embeds: [new EmbedBuilder().setColor(0x224d21).setDescription('Anulowano.')],
						components: [],
					});
					return collector.stop();
				}

				if (click.customId === 'prev' && currentIndex === 0) currentIndex += 1;
				if (click.customId === 'next' && currentIndex === resourcesLength - 1) currentIndex -= 1;

				if (click.customId === 'prev') currentIndex -= 1;
				if (click.customId === 'next') currentIndex += 1;

				row.components[0].setDisabled(currentIndex === 0);
				row.components[1].setDisabled(!(currentIndex + 1 < resourcesLength));

				if (currentIndex < resourcesLength) {
					await click.update({ embeds: [await generateEmbed(resources[currentIndex])], components: [row] });
				}

			});

			collector.on('end', _ => {
				row.components[0].setDisabled(true);
				row.components[1].setDisabled(true);
				row.components[2].setDisabled(true);
				interaction.editReply({ components: [row] });
			});

		} catch (e) {
			console.error(e);
			await interaction.editReply({ embeds: [errorEmbed('Wystąpił nieznany błąd.')] });
		}
	},
};
