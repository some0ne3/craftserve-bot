import { handlePhishingMessage } from '../utils/antyPhishing.js';
import { handleInviteMessage } from '../utils/antyInvite.js';

export default {
	name: 'messageCreate',
	async execute(message, client) {
		if (message.channel.type === 'dm') return;

		await handleInviteMessage(message);
		await handlePhishingMessage(message, client);
	},
};
