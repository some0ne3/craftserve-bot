const Discord = require("discord.js")

module.exports = {
    "name": "help",
    "options": [],
    "description": "Pokazuje menu z komendami",
    "aliases": ["pomoc"],
    run: async (bot, args, message) => {

        if(!message.isSlash) {
            return bot.api.channels(message.channel.id).messages.post({
                data: {
                    content: "Kliknij by zobaczyć listę komend!",
                    components: [
                        {
                            "type": 1,
                            "components": [
                                {
                                    "type": 2,
                                    "label": "Lista komend",
                                    "style": 1,
                                    "disabled": false,
                                    "custom_id": "button_help"
                                }
                            ]
                        }
                    ]

                }
            })
        }
        const generateEmbed = (start) => {
            const commands = bot.commands.array().slice(start, start+25)

            const embed = new Discord.MessageEmbed()
                .setTitle('Dostępne komendy serwerowe')
                .setDescription(`**Strona ${Math.floor(start/25)+1}/${Math.floor(bot.commands.size / 25)}**`)
                .setColor(bot.embed.color)
                .setFooter(bot.embed.footer.text, bot.embed.footer.iconURL)
                .setTimestamp()

            commands.forEach(command => {
                if(!command.hideHelp) embed.addField(command.name, `${command.description ?? "Brak"}`, true)
            })

            return embed;
        }
        const getAllCommandsEmbeds = () => {
            let currentIndex = 0, arr = [];
            while (currentIndex < bot.commands.filter(c=>!c.hideHelp).size){
                arr.push(generateEmbed(currentIndex))
                currentIndex+=25;
            }
            return arr;
        }

        await message.channel.send("", getAllCommandsEmbeds())
    }
}
