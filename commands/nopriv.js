module.exports = {
    "name": "nopriv",
    "options": [
        {
            "name": "tekst",
            "description": "Tekst wyświetlany przed odpowiedzią bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Bez prywatnych wiadomości!",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Bez prywatnych wiadomości.")
            .setDescription('**Czemu warto pytać i odpowiadać na serwerze, a nie w prywatnej wiadomości?**\n\n1. Zwiększacie szansę na szybszą odpowiedź\n2. Dostajecie wiele różnych przydatnych rad i uwag, od wielu osób\n3. Pozwalacie innym na nabieranie doświadczenia w pomaganiu\n4. Pomagacie innym, którzy może wstydzą się zadać pytanie (chociaż nie ma czego się wstydzić)\n5. Gdy działa CraftserveBot - osoba pomagająca może wziąć udział w losowaniu kodu na serwer Diamond, wystarczy jej podziękować komendą `!thx @nick`')


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}