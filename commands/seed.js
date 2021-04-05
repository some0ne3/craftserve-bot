const Discord = require('discord.js');

module.exports.command = ["seed"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Chcesz zmienić seed na własny?")
        .setDescription('Zrób 7 prostych kroków:\n\n1. Wyłącz serwer\n2. Otwórz główny katalog serwera.\n3. Znajdź plik server.properties i go otwórz.\n4. Znajdź linijkę level-seed=\n5. Wpisz po = swój seed.\n6. Zapisz plik, usuń starą mapę i uruchom serwer.\n7. Gotowe!')
        .setColor(0x224d21)
        .setFooter(`Komenda !seed | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}