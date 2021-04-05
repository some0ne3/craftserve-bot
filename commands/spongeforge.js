module.exports = {
    "name": "spongeforge",
    "description": "Pluginy Sponge na serwerze z modami",
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("Pluginy na Forge?")
            .setDescription('Chcesz mieć pluginy na serwerze z Forge? **Godząc się na pewne ustępstwa** jest to możliwe!\n**[Jak zainstalować SpongeForge](https://github.com/Craftserve/docs/blob/master/spongeforge.md)**\n**[Oficjalny download SpongeForge](https://www.spongepowered.org/downloads/spongeforge/stable/1.12.2)**')

        return message.channel.send(embed)
    }
}