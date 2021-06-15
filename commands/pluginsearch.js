const fetch = require("node-fetch");
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
        
        const searchResource = await (await fetch(`https://api.spiget.org/v2/search/resources/${filtered}?field=name&size=1&sort=-downloads`)).json();
        const item = searchResource[0];

        if (!item) return message.react ? message.react('❌') : message.channel.send('❌');

        const resource = await (await fetch(`https://api.spiget.org/v2/resources/${item.id}`)).json();
        const author = await (await fetch(`https://api.spiget.org/v2/authors/${item.author.id}`)).json();
        const category = await (await fetch(`https://api.spiget.org/v2/categories/${item.category.id}`)).json();
        const version = await (await fetch(`https://api.spiget.org/v2/resources/${item.id}/versions/${item.version.id}`)).json();

        const testedVersions = resource.testedVersions.length > 0 ? `\nPrzetestowane wersje: \`${resource.testedVersions.join(", ")}\`` : "";
        const embed = bot.embed
            .setTitle(resource.name)
            .setAuthor(author.name, spigotURL + author.icon.url, spigotURL + `members/${author.name}.${author.id}`)
            .setURL(spigotURL + `resources/${resource.id}`)
            .setDescription(resource.tag)
            .addField("Obecna wersja", `Wersja \`${version.name}\` \nData wydania: \`${new Date(version.releaseDate * 1000).toLocaleDateString()}\` \n\n**[>>POBIERZ<<](https://api.spiget.org/v2/resources/${resource.id}/versions/${version.id}/download)**\n`, true)
            .addField("Informacje", `Ilość pobrań: \`${resource.downloads}\` \nData wydania: \`${new Date(resource.releaseDate * 1000).toLocaleDateString()}\` \nKategoria: \`${category.name}\` \nOpinie: \`${"⭐".repeat(resource.rating.average.toFixed())}(${resource.rating.count})\` ${testedVersions}`, true)
            .addField("Inne", `[Pozostałe wersje (${resource.versions.length} wersji)](${spigotURL}resources/${resource.id}/history) \n[Historia zmian (${resource.updates.length} elementów)](${spigotURL}resources/${resource.id}/updates)`, false)
            .setThumbnail(spigotURL + resource.icon.url);
        return message.channel.send(!!mention ? `<@${mention.id}>` : "", embed);
    }
}
