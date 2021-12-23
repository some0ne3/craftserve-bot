import CustomCommands from '../../../models/CustomCommands.js';
import { SlashCommandSubcommandBuilder } from '@discordjs/builders';

export default {
	...new SlashCommandSubcommandBuilder()
		.setName('reload')
		.setDescription('Odświeża komendy, lub pojedynczą komendę.')
		.addStringOption(o =>
			o.setName('cmd_name')
				.setDescription('Nazwa komendy do odświeżenia')
				.setRequired(false))
		.toJSON(),
	async execute(interaction) {
		const currentApplicationCommands = interaction.guild.commands.cache;
		console.log(currentApplicationCommands);
		/*
					const customCommands = (await cmdList).map(command => ({
						name: command.command_name,
						description: command.command_description,
						options: [
							{
								"name": "tekst",
								"description": "Tekst wyświetlany przed odpowiedzią bota",
								"type": 3,
								"required": false,
							},
						],
					}))
		*/
	},
};