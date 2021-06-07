const {serverid} = require("../config.json");
const Discord = require("discord.js");
module.exports = {
    "name": "slashreload",
    "options": [],
    "description": "Przeładowywuje slashcommands",
    "aliases": [],
    "hideHelp": true,
    run: async (bot, args, message) => {
        if (!bot.owners.includes(message.author.id)) return;
        const errors = [], completed = [];
        const generateEmbed = () => {
            return new Discord.MessageEmbed()
                .setTitle("SlashReload")
                .setColor("YELLOW")
                .setDescription("W toku...")
                .addField("Ukończone", `\`\`\`\n${completed}\`\`\``)
                .addField("Błąd", `\`\`\`\n${errors}\`\`\``);
        }
        const msg = await message.channel.send(generateEmbed());

        const commands = bot.commands.array();

        for (const command of commands) {
            if (command.hideHelp) continue;
            await bot.api.applications(bot.user.id).guilds(serverid).commands.post({
                data: {
                    name: command.name,
                    description: command.description,
                    options: command.options
                }
            }).then(() => {
                completed.push(command.name)
                console.log(`[SlashCommands] Pomyslnie przeładowano ${command.name}`)
            }, reason => {
                errors.push(command.name)
                console.log(`[SlashCommands] Błąd podczas przeładowywania ${command.name}: `, reason)
            });
            await msg.edit(generateEmbed())
        }
        if (errors.length > 0) {
            await msg.edit(generateEmbed().setColor("RED").setDescription("Ukończono z błędami."));
        } else {
            await msg.edit(generateEmbed().setColor("GREEN").setDescription("Ukończono pomyślnie."));
        }
    }
}
