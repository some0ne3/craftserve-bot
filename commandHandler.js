const fs = require("fs");

module.exports = (bot) => {
    fs.readdirSync("./commands/").forEach(command => {
        if(!command.endsWith(".js")) return;
        try {
            const cmd = require(`./commands/${command}`)
            bot.commands.set(cmd.name, cmd)
            if(cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach(alias => bot.aliases.set(alias, cmd.name))
        } catch (e) {
            console.log(e)
        }
    })
}