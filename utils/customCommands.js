export const editCustomCommand = async (id, command, guild) => {
	const commandObj = {
		name: command.command_name,
		description: command.command_description,
	};
	if (command.copy_user_input) {
		commandObj.options = [
			{
				'name': 'tekst',
				'description': 'Tekst wyświetlany przed odpowiedzią bota',
				'type': 3,
				'required': false,
			},
		];
	}
	await guild?.commands.edit(id, commandObj);
};

export const addCustomCommand = async (command, guild) => {
	const commandObj = {
		name: command.command_name,
		description: command.command_description,
	};
	if (command.copy_user_input) {
		commandObj.options = [
			{
				'name': 'tekst',
				'description': 'Tekst wyświetlany przed odpowiedzią bota',
				'type': 3,
				'required': false,
			},
		];
	}
	return (await guild?.commands.create(commandObj))?.id;
};