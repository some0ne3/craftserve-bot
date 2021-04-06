const requestEvent = (event) => require(`./${event}`);

module.exports = bot => {
    bot.on("ready", async () => requestEvent("ready")(bot));
};