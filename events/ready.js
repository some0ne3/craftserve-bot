module.exports = async bot => {
    const guild = bot.guilds.cache.get("387222965131149313");
    const memberCount = guild?.memberCount - guild?.members.cache.filter(member => member.user.bot).size;
    console.log("Bot został pomyślnie włączony.");

    const activities = [
        { name: '!help', type: 'LISTENING' },
        { name: `!pomoc`, type: 'LISTENING' }
    ];
    await bot.user.setPresence({status: 'online', activity: activities[0]});
    let activity = 1;
    setInterval(() => {
        activities[2] = { name: `${memberCount} użytkowników`, type: 'WATCHING' };
        if (activity > 2) activity = 0;
        bot.user.setActivity(activities[activity]);
        activity++;
    }, 10000);
};