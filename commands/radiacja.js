const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["radiacja"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Radiacja na serwerze")
        .setDescription('Przy pierwszym uruchomieniu pluginu potrzebujesz ustalić region który oznaczy obszar jako wolny od radiacji. W innym wypadku strefa radiacji nie będzie działać. Użyj komendy `/radiation safe <radius>` by stworzyć obszar wolny od radiacji w formie sześcianu (cuboid) w promieniu radius od twojej obecnej lokalizacji. Region zostanie założony na pełną wysokość świata. Teraz po wyjściu z regionu wolnego od radiacji powinien pokazywać się boss bar oraz gracze powinni otrzymywać obrażenia. Płyn Lugola można nadać sobie za pomocą komendy `/radiation potion`.')
        .setColor(0x224d21)
        .setFooter(`Komenda !radiacja | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}