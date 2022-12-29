import { EmbedBuilder as OldEmbedBuilder, resolveColor } from 'discord.js';

export const errorEmbed = (value) => ({
	color: resolveColor('Red'),
	author: {
		name: 'Błąd!',
	},
	description: value,
	timestamp: new Date(),
});

export const successEmbed = (value) => ({
	color: resolveColor('Green'),
	description: value,
	timestamp: new Date(),
});

export class EmbedBuilder extends OldEmbedBuilder {
	isValid() {
		let charSum = 0;
		const { title, author, description, fields, footer } = this.data;
		const getLength = (string) => {
			const len = string?.replaceAll(/\s/g, '')?.length ?? 0;
			charSum += len;
			return len;
		};
		if (title || author?.name || description || fields[0]?.value || footer?.text) {
			if (getLength(title) < 256 &&
				getLength(description) < 4096 &&
				getLength(footer?.text) < 2048 &&
				getLength(author?.name) < 256 &&
				fields.every(field => getLength(field.value) < 1024 && getLength(field.name) < 256)) {
				if (fields.length < 25) {
					if (charSum < 6000) {
						return true;
					}
				}
			}
		}
		return false;
	}
}