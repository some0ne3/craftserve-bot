const Discord = require("discord.js")

module.exports = {
    "name": "help",
    "description": "Pokazuje menu z komendami",
    "aliases": ["pomoc"],
    run: async (bot, args, message) => {

        const generateEmbed = (start) => {
            const pages = {
                0: "1",
                25: "2"
            }

            const commands = bot.commands.array().slice(start, start+25)

            const embed = new Discord.MessageEmbed()
                .setDescription(`**Strona ${pages[start]}/${Math.round(bot.commands.size / 25)}**`)
                .setColor(0x224d21)
                .setFooter(`Komenda !help | ${message.author.tag}`)
                .setTimestamp()

            commands.forEach(command => {
                embed.addField(command.name, `${command.description ?? "Brak"}`, true)
            })

            return embed;
        }

        const msg = await message.channel.send(generateEmbed(0))
        await msg.react('➡️')

        const collector = await msg.createReactionCollector(
            (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id,
            {time: 30000}
        )

        let currentIndex = 0
        collector.on('collect', reaction => {
            collector.resetTimer()
            msg.reactions.removeAll().then(async () => {
                reaction.emoji.name === '⬅️' ? currentIndex -= 25 : currentIndex += 25
                msg.edit(generateEmbed(currentIndex))
                if (currentIndex !== 0) await msg.react('⬅️')
                if (currentIndex + 25 < bot.commands.size) msg.react('➡️')
            })
        })
        collector.on(`end`, () => {
            msg.reactions.removeAll();
        })
    }
}
