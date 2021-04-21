const {serverid} = require("../config.json");

module.exports = {
    "name": "slashreload",
    "options": [],
    "description": "Przeładowywuje slashcommands",
    "aliases": [],
    "hideHelp": true,
    run: async (bot, args, message) => {
        if (!bot.owners.includes(message.author.id)) return;
        const msg = await message.channel.send("Zaczynam proces przeładowania!");

        const commands = bot.commands.array();

        for (const command of commands) {
            if (command.hideHelp) continue;
            await bot.api.applications(bot.user.id).guilds(serverid || "387222965131149313").commands.post({
                data: {
                    name: command.name,
                    description: command.description,
                    options: command.options
                }
            }).catch(e => {
                message.channel.send(`Błąd podczas ładowania ${command.name}, szczegóły w konsolce`);
                console.log(e)
            })
            console.log(`[SlashCommands] Pomyslnie przeładowano ${command.name}`)
        }
        msg.edit("Przeładowano pomyślnie!")
    }
}
