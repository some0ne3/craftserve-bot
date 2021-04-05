const Discord = require('discord.js');
const messages = require(`../locale/messages_pl.json`);

module.exports.command = ["nopriv"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Bez prywatnych wiadomości.")
        .setDescription('**Czemu warto pytać i odpowiadać na serwerze, a nie w prywatnej wiadomości?**\n\n1. Zwiększacie szansę na szybszą odpowiedź\n2. Dostajecie wiele różnych przydatnych rad i uwag, od wielu osób\n3. Pozwalacie innym na nabieranie doświadczenia w pomaganiu\n4. Pomagacie innym, którzy może wstydzą się zadać pytanie (chociaż nie ma czego się wstydzić)\n5. Gdy działa CraftserveBot - osoba pomagająca może wziąć udział w losowaniu kodu na serwer Diamond, wystarczy jej podziękować komendą `!thx @nick`')
        .setColor(0x224d21)
        .setFooter(`Komenda !nopriv | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}