import WhitelistedServers from '../../models/WhitelistedServers.js';
import { MessageEmbed } from 'discord.js';
import { errorEmbed, successEmbed } from '../../utils/embeds.js';

export default {
	name: 'serverwhitelist',
	description: 'Zarządzanie whitelistą filtra antyInvite.',
	options: [
		{
			type: 1,
			name: 'add',
			description: 'Pozwala na dodanie serwera do whitelisty antyInvite.',
			options: [
				{
					type: 3,
					name: 'server_id',
					description: 'Serwer do dodania na whitelistę antyInvite',
					required: true,
				},
			],
		},
		{
			type: 1,
			name: 'remove',
			description: 'Pozwala na usunięcie serwera z whitelisty antyInvite.',
			options: [
				{
					type: 3,
					name: 'server_id',
					description: 'Serwer do usunięcia z whitelisty antyInvite',
					required: true,
				},
			],
		},
		{
			type: 1,
			name: 'list',
			description: 'Wyświetla whitelistę antyInvite.',
		},

	],
	async execute(interaction) {
		const serverId = interaction.options.getString('server_id');
		if (serverId.length !== 18) return interaction.reply({ embeds: [errorEmbed(`ID: \`${serverId}\` jest niepoprawne.`)] });
		switch (interaction.options.getSubcommand()) {
		case 'add':
			const addedServer = new WhitelistedServers({
				whitelisted_server_id: serverId,
				parent_server_id: interaction.guild?.id,
			});
			await addedServer.save((e) => {
				if (!e) return interaction.reply({ embeds: [successEmbed(`Pomyślnie dodano serwer o ID: \`${serverId}\` do whitelisty.`)] });
				if (e.code && e.code === 11000) return interaction.reply({ embeds: [errorEmbed(`Serwer o ID: \`${serverId}\` jest już na whiteliście tego serwera.`)] });
				return interaction.reply({ embeds: [errorEmbed(`Przy dodawaniu serwera o ID: \`${serverId}\` wystąpił nieznany błąd.`)] });
			});
			break;
		case 'remove':
			WhitelistedServers.deleteOne({
				whitelisted_server_id: serverId,
				parent_server_id: interaction.guild?.id,
			}).exec().then((res) => {
				if (res.ok === 1 && res.deletedCount > 0) return interaction.reply({ embeds: [successEmbed(`Pomyślnie usunięto serwer o ID: \`${serverId}\` z whitelisty.`)] });
				return interaction.reply({ embeds: [errorEmbed(`Na whiteliście nie ma serwera o ID: \`${serverId}\`.`)] });
			}, (res) => {
				console.error(res);
				return interaction.reply({ embeds: [errorEmbed(`Podczas usuwania serwera o ID: \`${serverId}\` wystąpił nieznany błąd.`)] });
			});
			break;
		case 'list':
			const wlList = WhitelistedServers.find({ parent_server_id: interaction.guild?.id }).exec();
			let strings = (await wlList).map((srv, i) => `${i + 1}. \`${srv.whitelisted_server_id}\``);
			let desc = strings.length > 0 ? strings.join('\n') : 'Brak.';
			let embed = new MessageEmbed()
				.setDescription(desc)
				.setTitle(`Serwery na whiteliście ${interaction.guild.name}`)
				.setTimestamp();
			return await interaction.reply({ embeds: [embed] });
		}
	},
};