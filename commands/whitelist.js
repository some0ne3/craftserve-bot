const Discord = require('discord.js');

module.exports.command = ["whitelist"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Whitelista na serwerach non-premium")
        .setDescription('Whitelista na serwerach działających w offline mode (nonpremium) nie działa jak należy i bywają problemy z dodawaniem do niej ludzi (najlepiej jakby taka osoba była na serwerze w momencie jej dodawania, co wymagałoby tymczasowego wyłączenia jej). Bład ten został zgłoszony w 2014 (https://bugs.mojang.com/browse/MC-50386).\n\nZamiast korzystać z wbudowanej whitelisty, warto dograć dodatkowy plugin obsługujący ją, np. ten https://www.spigotmc.org/resources/easywhitelist-name-based-whitelist.65222/')
        .setColor(0x224d21)
        .setFooter(`Komenda !whitelist | ${message.author.username}#${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}