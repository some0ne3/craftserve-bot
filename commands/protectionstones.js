module.exports = {
    "name": "protectionstones",
    "description": "Cuboidy",
    "aliases": ["ps"],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("ProtectionStones")
            .setDescription('"ProtectionStones to plugin, który pozwala w łatwy sposób tworzyć cuboidy poprzez stawianie >BLOKÓW MOCY<.\nPamiętaj o poprawnej jego konfiguracji zanim zgłosisz udasz się tutaj po pomoc.\n\n[JAK OBSŁUGIWAĆ PROTECTIONSTONES](https://github.com/espidev/ProtectionStones/wiki)')

        return message.channel.send(embed)
    }
}