import { SlashCommandSubcommandBuilder } from 'discord.js';
import BotAdministrators from '../../../models/BotAdministrators.js';

export default {
	...new SlashCommandSubcommandBuilder()
		.setName('remove')
		.setDescription('Pozwala na usunięcia administratora')
		.addStringOption(string =>
			string
				.setName('user')
				.setDescription('Użytkownik do usunięcia jako administrator')
				.setRequired(true)
				.setAutocomplete(true),
		)
		.toJSON(),
	async execute(interaction) {
		const user_id = interaction.options.getString('user');
		const user = await interaction.client.users.fetch(user_id);

		const administrators = await BotAdministrators.find();

		if (!administrators.find(x => x.user_id === user.id)) {
			return interaction.reply({ content: 'Podany użytkownik nie jest administratorem' });
		}

		if (administrators.length === 1) {
			return interaction.reply({ content: 'Nie możesz usunąć jedynego administratora' });
		}

		await BotAdministrators.deleteOne({
			user_id: user.id,
		})
			.then(() => {
				interaction.reply({ content: `Pomyślnie usunięto ${user.tag} jako administratora` });
			}).catch(e => {
				console.error(e);
				interaction.reply({
					content: 'Wystąpił problem podczas usuwania użytkownika jako administratora',
					ephemeral: true,
				});
			});
	},
};