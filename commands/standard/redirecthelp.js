import {
	ActionRowBuilder,
	ContextMenuCommandBuilder,
	StringSelectMenuBuilder,
} from 'discord.js';
import { ChannelType } from 'discord-api-types/v9';
import ServerSettings from '../../models/ServerSettings.js';

export default {
	...new ContextMenuCommandBuilder()
		.setName('Utwórz wątek na kanałach pomocy')
		.setType(3)
		.setDMPermission(false)
		.toJSON(),
	async execute(interaction) {
		const message = interaction.options?.get('message')?.message;

		if (interaction.channel.isThread()) {
			return interaction.reply({
				content: 'Ta komenda może być użyta tylko na kanale',
				ephemeral: true,
			});
		}

		if (message.author.id === interaction.user.id) {
			return interaction.reply({
				content: 'Nie możesz utworzyć prywatnego wątku dla siebie',
				ephemeral: true,
			});
		}

		if (message.author.bot) {
			return interaction.reply({
				content: 'Nie możesz utworzyć prywatnego wątku dla bota',
				ephemeral: true,
			});
		}

		const settings = await ServerSettings.find({ server_id: interaction.guild.id }).exec();

		const supportChannels = interaction.guild.channels.cache.get(settings.help_category).parent.children.filter(channel => channel.type === ChannelType.GuildForum);

		if (!supportChannels.size) {
			return interaction.reply({
				content: 'Nie znaleziono kanałów pomocy',
				ephemeral: true,
			});
		}

		const channelActionRow = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('channel')
					.setPlaceholder('Wybierz kanał')
					.addOptions(
						supportChannels.map(channel => ({
							label: channel.name,
							value: channel.id,
						})),
					),
			);

		const reply = await interaction.reply({
			content: 'Wybierz kanał na który chcesz przekierować osobę',
			components: [channelActionRow],
			ephemeral: true,
		});

		const collector = reply.createMessageComponentCollector({ time: 60000 });

		collector.on('collect', async (int) => {
			const channel = int.guild.channels.cache.get(int.values[0]);

			const thread = await channel.threads.create({
				name: `${message.author.username}`,
				autoArchiveDuration: 1440,
				reason: `${interaction.user.username} przekierował ${message.author.username} na kanał ${channel.name}`,
			});

			await thread.members.add(message.author.id);
			await thread.members.add(interaction.user.id);

			await interaction.reply({
				content: `Pomyślnie utworzono wątek dla ${message.author.username} na kanale ${channel.name}`,
				ephemeral: true,
			});
		});

		collector.on('end', () => {
			reply.edit({
				content: 'Czas na wybór kanału minął',
				components: [],
			});
		});

	},
};
