import { MessageEmbed as OldMessageEmbed } from 'discord.js';

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

export class MessageEmbed extends OldMessageEmbed {
	isValid() {
		let charSum = 0;
		const getLength = (string) => {
			const len = string?.replaceAll(/\s/g, '')?.length ?? 0;
			console.log(len);
			charSum += len;
			return len;
		};
		if (this.title || this.author?.name || this.description || this.fields[0]?.value || this.footer?.text) {
			if (getLength(this.title) < 256 &&
				getLength(this.description) < 4096 &&
				getLength(this.footer?.text) < 2048 &&
				getLength(this.author?.name) < 256 &&
				this.fields.every(field => getLength(field.value) < 1024 && getLength(field.name) < 256)) {
				if (this.fields.length < 25) {
					if (charSum < 6000) {
						return true;
					}
				}
			}
		}
		return false;
	}
}