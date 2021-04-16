const requestEvent = (event) => require(`./${event}`);

module.exports = bot => {
    bot.on("ready", async () => requestEvent("ready")(bot));
    bot.on("ready", async () => requestEvent("createSlash")(bot));
    bot.ws.on(`INTERACTION_CREATE`, (interaction) => requestEvent("slashcommands")(bot, interaction))
};