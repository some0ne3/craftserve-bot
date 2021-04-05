const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["pk", "pomozektos"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Przedstaw się")
        .setDescription('Jeśli potrzebujesz pomocy to **NAJPIERW PRZEDSTAW SWÓJ PROBLEM**, a potem pytaj czy ktoś umie Ci pomóc.')
        .setImage(`https://vader.joemonster.org/upload/rga/17787764d97f32c67653138_10156519191.jpg`)
        .setColor(0x224d21)
        .setFooter(`Komenda !pomozektos | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}