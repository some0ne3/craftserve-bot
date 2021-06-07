const config = require("../config.json");

module.exports = async bot => {
    const guild = bot.guilds.cache.get(config.serverid);
    console.log("Bot został pomyślnie włączony.");

    const activities = [
        { name: `${config.prefix}help`, type: 'LISTENING' },
        { name: `${config.prefix}pomoc`, type: 'LISTENING' }
    ];
    await bot.user.setPresence({status: 'online', activity: activities[0]});
    let activity = 1;

    setInterval(() => {
        activities[2] = { name: `${guild?.memberCount} użytkowników`, type: 'WATCHING' };
        if (activity > 2) activity = 0;
        bot.user.setActivity(activities[activity]);
        activity++;
    }, 20000);
};