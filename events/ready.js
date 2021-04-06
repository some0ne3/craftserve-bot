module.exports = bot => {
    const guild = bot.guilds.cache.get("387222965131149313");
    const memberCount = guild?.memberCount - guild?.members.cache.filter(member => member.user.bot).size;
    console.log("Bot został pomyślnie włączony.");

    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${memberCount || "TEST"} użytkowników`,
            type: "LISTENING"
        }
    });
};