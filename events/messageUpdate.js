import { handlePhishingMessage } from '../utils/antyPhishing.js';
import handleInviteMessage from '../utils/antyInvite.js';

export default {
	name: 'messageUpdate',
	async execute(oldMessage, message, client) {
		if (message.channel.type === 'dm' || oldMessage.content === message.content) return;

		await handleInviteMessage(message);
		await handlePhishingMessage(message, client);
	},
};
