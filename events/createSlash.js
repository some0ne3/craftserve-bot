const {serverid} = require("../config.json");

module.exports = async (bot) => {
    console.log("[SlashCommands] Ładowanie");

    const commands = bot.commands.array();
    const slashs = await bot.api.applications(bot.user.id).guilds(serverid || "387222965131149313").commands.get();


    for (const command of commands) {
        if(command.hideHelp) continue;

        if (!slashs.find(slash => slash.name === command.name)) {
            try {
                await bot.api.applications(bot.user.id).guilds(serverid || "387222965131149313").commands.post({
                    data: {
                        name: command.name,
                        description: command.description,
                        options: command.options
                    }
                })
                console.log(`[SlashCommands] Pomyslnie dodano ${command.name}`)
            } catch(e) {
                console.log(`[SlashCommands] Bład podczas ładowania ${command.name}`);
                console.log(e)
            }
        }
    }
    console.log(`[SlashCommands] Załadowano`)
}