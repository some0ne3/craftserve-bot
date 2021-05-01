const requestEvent = (event) => require(`./${event}`);

module.exports = bot => {
    bot.on("ready", async () => requestEvent("ready")(bot));
    bot.on("ready", async () => requestEvent("createSlash")(bot));
    bot.on("guildMemberAdd", async (member) => requestEvent("guildMemberAdd")(bot, member));
    bot.on("guildMemberRemove", async (member) => requestEvent("guildMemberRemove")(bot, member));
    bot.ws.on(`INTERACTION_CREATE`, (interaction) => requestEvent("slashcommands")(bot, interaction))
};