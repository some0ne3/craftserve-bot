const fetch = require("node-fetch");
const Discord = require("discord.js");
module.exports = {
    "name": "pluginsearch",
    "options": [
        {
            "name": "treść",
            "description": "Plugin który chcesz wyszukać",
            "type": 3,
            "required": true,
        },
    ],
    "description": "Pozwoli Ci wyszukać plugin spośród dostępnych na spigotmc.org",
    "aliases": [],
    run: async (bot, args, message) => {
        const spigotURL = "https://www.spigotmc.org/";
        const regexp = new RegExp('<[@#!&](.*?)>', 'g');
        const filtered = args.filter(a => !regexp.test(a)).join("+");
        const mention = message.mentions?.users.first() || "";
        if (args.length <= 0) return;

        try {
            const searchResource = await (await fetch(`https://api.spiget.org/v2/search/resources/${encodeURI(filtered)}?field=name&sort=-downloads`)).json();

            const len = searchResource.length;
            let currentIndex = 0;

            const generateEmbed = async (item) => {
                if (!item) return false;
                const resource = await (await fetch(`https://api.spiget.org/v2/resources/${item.id}`)).json();
                const author = await (await fetch(`https://api.spiget.org/v2/authors/${item.author.id}`)).json();
                const category = await (await fetch(`https://api.spiget.org/v2/categories/${item.category.id}`)).json();
                const version = await (await fetch(`https://api.spiget.org/v2/resources/${item.id}/versions/${item.version.id}`)).json();

                const testedVersions = resource.testedVersions.length > 0 ? `\nPrzetestowane wersje: \`${resource.testedVersions.join(", ")}\`` : "";
                return new Discord.MessageEmbed()
                    .setColor(bot.embed.color)
                    .setTimestamp(bot.embed.timestamp)
                    .setFooter(bot.embed.footer.text, bot.embed.footer.iconURL)
                    .setTitle(resource.name)
                    .setAuthor(author.name, author.icon.url ? (spigotURL + author.icon.url) : "https://static.spigotmc.org/styles/spigot/xenforo/avatars/avatar_male_m.png", spigotURL + `members/${author.name}.${author.id}`)
                    .setURL(spigotURL + `resources/${resource.id}`)
                    .setDescription(resource.tag)
                    .addField("Obecna wersja", `Wersja \`${version.name}\` \nData wydania: \`${new Date(version.releaseDate * 1000).toLocaleDateString()}\` \n\n**[>>POBIERZ<<](https://api.spiget.org/v2/resources/${resource.id}/versions/${version.id}/download)**\n`, true)
                    .addField("Informacje", `Ilość pobrań: \`${resource.downloads}\` \nData wydania: \`${new Date(resource.releaseDate * 1000).toLocaleDateString()}\` \nKategoria: \`${category.name}\` \nOpinie: \`${"⭐".repeat(resource.rating.average.toFixed())}(${resource.rating.count})\` ${testedVersions}`, true)
                    .addField("Inne", `[Pozostałe wersje (${resource.versions.length} wersji)](${spigotURL}resources/${resource.id}/history) \n[Historia zmian (${resource.updates.length} elementów)](${spigotURL}resources/${resource.id}/updates)`, false)
                    .setThumbnail(resource.icon.url ? (spigotURL + resource.icon.url) : "https://static.spigotmc.org/styles/spigot/xenresource/resource_icon.png");
            }

            const item = searchResource[0];
            if (!item) return message.react ? message.react('❌') : message.channel.send('❌');

            const sent = await message.channel.send(!!mention ? `<@${mention.id}>` : "", await generateEmbed(searchResource[currentIndex]));
            await sent.react("❌");
            if (currentIndex + 1 < len) await sent.react('➡️')
            const collector = await sent.createReactionCollector(
                (reaction, user) => ['⬅️', '➡️', '❌'].includes(reaction.emoji.name) && user.id === message.author.id,
                {time: 30000}
            )

            collector.on('collect', async reaction => {
                collector.resetTimer()
                sent.reactions.removeAll().then(async () => {
                    if (reaction.emoji.name === '❌') {
                        await collector.stop()
                        return sent.edit(new Discord.MessageEmbed().setColor(bot.embed.color).setDescription("Anulowano."))
                    }
                    reaction.emoji.name === '⬅️' ? currentIndex -= 1 : currentIndex += 1;
                    if (currentIndex !== 0) await sent.react('⬅️')
                    await sent.react("❌");
                    if (currentIndex < len) {
                        await sent.edit(!!mention ? `<@${mention.id}>` : "", await generateEmbed(searchResource[currentIndex]))
                        if (currentIndex + 1 < len) await sent.react('➡️')
                    }
                })
            })
            collector.on(`end`, async () => {
                await sent.reactions.removeAll();
            })
        } catch (e) {
            return message.react ? message.react('❌') : message.channel.send('❌');
        }
    }
}
