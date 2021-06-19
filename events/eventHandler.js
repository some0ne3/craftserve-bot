const requestEvent = (event) => require(`./${event}`);

module.exports = bot => {
    bot.on("ready", async () => requestEvent("ready")(bot));
    bot.on("ready", async () => requestEvent("createSlash")(bot));
    bot.on("message", async (message) => requestEvent("antyInvite")(bot, message));
    bot.on("message", async (message) => requestEvent("message")(bot, message));
    bot.ws.on(`INTERACTION_CREATE`, (interaction) => requestEvent("slashcommands")(bot, interaction));
};