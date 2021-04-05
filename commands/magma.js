const Discord = require('discord.js');

module.exports.command = ["magma"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Silnik Magma - nie uruchamia się")
        .setDescription('Przejdź do plików serwera, otwórz plik magma.yml i zmień wartość `auto-update` z `true` na `false`')
        .setColor(0x224d21)
        .setFooter(`Komenda !magma | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}