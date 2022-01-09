const requestEvent = (event) => require(`./${event}`);

module.exports = bot => {
    bot.on("ready", async () => requestEvent("ready")(bot));
    bot.on("ready", async () => requestEvent("createSlash")(bot));
    bot.on("message", async (message) => requestEvent("antyInvite").message(bot, message));
    bot.on("messageUpdate", async (oldMessage, message) => requestEvent("antyInvite").edit(bot, oldMessage, message));
    bot.on("message", async (message) => requestEvent("message")(bot, message));
    bot.on("guildMemberAdd", async (member) => requestEvent("guildMemberAdd")(bot, member));
    bot.ws.on(`INTERACTION_CREATE`, (interaction) => requestEvent("slashcommands")(bot, interaction));
};