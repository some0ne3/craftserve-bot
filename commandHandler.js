const fs = require("fs");

module.exports = (bot) => {
    fs.readdirSync("./commands/").forEach(command => {
        if(!command.endsWith(".js")) return;
        try {
            const cmd = require(`./commands/${command}`)
            bot.commands.set(cmd.name, cmd)
        } catch (e) {
            console.log(e)
        }
    })
}