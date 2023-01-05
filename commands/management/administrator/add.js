import { SlashCommandSubcommandBuilder } from 'discord.js';
import BotAdministrators from '../../../models/BotAdministrators.js';

export default {
	...new SlashCommandSubcommandBuilder()
		.setName('add')
		.setDescription('Pozwala na dodanie administratora')
		.addUserOption(string =>
			string
				.setName('user')
				.setDescription('Użytkownik do dodania jako administrator')
				.setRequired(true),
		)
		.toJSON(),
	async execute(interaction) {
		const user = interaction.options.getUser('user');

		const administrator = await BotAdministrators.findOne({ user_id: user.id });

		if (administrator) {
			return interaction.reply({ content: 'Podany użytkownik jest już administratorem!', ephemeral: true });
		}

		await BotAdministrators.create({
			user_id: user.id,
		})
			.then(() => {
				interaction.reply({ content: `Pomyślnie dodano ${user.tag} jako administratora` });
			}).catch(e => {
				console.error(e);
				interaction.reply({
					content: 'Wystąpił problem podczas dodawania użytkownika jako admistratora',
					ephemeral: true,
				});
			});
	},
};