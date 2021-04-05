const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["offline"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Serwer w trybie offline")
        .setDescription('Jeśli na Twoim serwerze nie wyświetlają się skiny graczy premium lub nie dostają oni uprawnien OPa mimo wpisania na listę, to najprawdopodobniej jest on uruchomiony w trybie offline. Oznacza to, że Twój serwer nie łączy się z serwerami Mojangu w celu uwierzytelniania graczy.\n\nJeśli chcesz by serwer pozostał non-premium, [ten plugin](https://www.spigotmc.org/resources/skinsrestorer.2124/) pozwoli graczom mieć swoje skiny. Informacje o pluginie obsługującym konta znajdziesz pod !authme.\n\nJeśli chcesz włączyć online mode - ustaw **online-mode=true** w server.properties.\n**[Szczegóły tutaj](https://github.com/Craftserve/docs/blob/master/online-mode.md)**')
        .setColor(0x224d21)
        .setFooter(`Komenda !offline | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}