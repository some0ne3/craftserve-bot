module.exports = bot => {
    console.log("Bot został pomyślnie włączony.");

    bot.user.setPresence({
        status: 'online',
        activity: {
            name: "!help",
            type: "LISTENING"
        }
    });
};