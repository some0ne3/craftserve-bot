const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["km"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Kwadratowa masakra - Serwer")
        .setDescription('**Czy chcesz założyć swoją własną Kwadratową Masakrę?**\n\nMamy pakiet specjalnie dla Ciebie! **<https://craftserve.pl/create/km>**\n\nPakiet zawiera wszystkie pluginy, jakie znasz z KM, a do tego serwery z tego pakietu są gotowe do gry od razu w momencie zakupu! **Bez konieczności grzebania w ustawieniach!**')
        .setColor(0x224d21)
        .setFooter(`Komenda !km | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}