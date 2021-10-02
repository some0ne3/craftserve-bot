export const errorEmbed = (value) => ({
	color: 'RED',
	author: {
		name: 'Błąd!',
	},
	description: value,
	timestamp: new Date(),
});

export const successEmbed = (value) => ({
	color: 'GREEN',
	description: value,
	timestamp: new Date(),
});