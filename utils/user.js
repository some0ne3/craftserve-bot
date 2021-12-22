export const clearUserMessages = (userId, guildId, client) => {
	client.guilds.cache.get(guildId).channels.cache.filter(channel => channel.type === 'GUILD_TEXT').forEach(textChannel => {
		textChannel.messages.fetch({ limit: 20 })
			.then(messages => {
				textChannel.bulkDelete(messages.filter(m => m.author.id === userId));
			})
			.catch(console.error);
	});
};
