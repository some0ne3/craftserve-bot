module.exports = bot => {
    const guild = bot.guilds.cache.get("742114424848122026");
    const memberCount = guild.members.cache.filter(member => !member.user.bot).size;
    console.log("Bot został pomyślnie włączony.");

    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${memberCount} użytkowników`,
            type: "LISTENING"
        }
    });
};