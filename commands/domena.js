const Discord = require('discord.js');

module.exports.command = ["domena"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Jak podłączyć własną domenę do serwera zakupionego w Craftserve")
        .setDescription('Istnieje możliwośc podpięcia własnej zewnętrznej domeny do serwera hostowanego w Craftserve, więcej informacji na temat konfiguracji takiej domeny znajdziesz w panelu serwera (zakładka Ustawienia -> Domena) oraz w [tym poradniku](https://spigot.pl/forum/thread/7-jak-pod%C5%82%C4%85czy%C4%87-w%C5%82asn%C4%85-domen%C4%99-do-serwera-zakupionego-w-craftserve-na-przyk%C5%82adzie-c/)\n\n**Jeżeli jednak nie posiadasz jeszcze własnej domeny, rozważ jej zakup bezpośrednio w Craftserve. Koszt takiej domeny .pl to jedyne 20zł. Taka domena jest od razu skonfigurowana do działania z Twoim serwerem Minecraft.**')
        .setColor(0x224d21)
        .setFooter(`Komenda !domena | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}