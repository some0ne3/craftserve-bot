import { SlashCommandBuilder } from 'discord.js';
import ServerSettings from '../../models/ServerSettings.js';
import BotAdministrators from '../../models/BotAdministrators.js';

export default {
	...new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Restartuje bota')
		.toJSON(), async execute(interaction) {
		const isManagementServer = (await ServerSettings.findOne({ server_id: interaction.guild.id }))?.is_management_server;
		const isAdminUser = (await BotAdministrators.findOne({ user_id: interaction.user.id }));
		console.log(isManagementServer, isAdminUser);
		if (!isManagementServer || !isAdminUser) return;
		interaction.reply({ content: 'Trwa restartowanie bota!', ephemeral: true }).then(_ => {
			process.exit(0);
		});
	},
};
