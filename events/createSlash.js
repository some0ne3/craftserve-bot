const {serverid} = require("../config.json");

module.exports = async (bot) => {
    console.log("[SlashCommands] Ładowanie");

    const commands = bot.commands.array();
    const slashs = await bot.api.applications(bot.user.id).guilds(serverid).commands.get();

    // for(const slash of slashs) {
    //     await bot.api.applications(bot.user.id).guilds(serverid).commands(slash.id).delete();
    //     console.log(`[SlashCommands] Pomyslnie usunięto ${slash.name}`)
    // }

    for (const command of commands) {
        if(command.hideHelp) continue;

        if (!slashs.find(slash => slash.name === command.name)) {
            await bot.api.applications(bot.user.id).guilds(serverid).commands.post({
                data: {
                    name: command.name,
                    description: command.description,
                    options: command.options
                }
            })
            console.log(`[SlashCommands] Pomyslnie dodano ${command.name}`)
        }
    }
    console.log(`[SlashCommands] Załadowano`)
}