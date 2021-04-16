const Discord = require("discord.js");

module.exports = async (bot, interaction) => {
    const command = bot.commands.find(command => command.name === interaction.data.name)

    const guild = bot.guilds.cache.get(interaction.guild_id)

    const message = {
        channel: guild.channels.cache.get(interaction.channel_id),
        member: guild.members.cache.get(interaction.member.user.id),
        author: bot.users.cache.get(interaction.member.user.id),
        guild: guild,
        createdTimestamp: Discord.SnowflakeUtil.deconstruct(interaction.id).timestamp,
    }

    const oldSend = message.channel.send;

    message.channel.send = async (text, embed) => {
        bot.api.webhooks(bot.user.id, interaction.token).messages('@original').patch({
            data: {
                content: text,
                embeds: [embed]
            }
        });
        return message.channel.messages.cache.get((await bot.api.webhooks(bot.user.id, interaction.token).messages('@original').get()).id);
    }

    bot.embed = new Discord.MessageEmbed()
        .setColor(0x224d21)
        .setFooter(`Komenda !${command.name} | ${message.author.tag}`)
        .setTimestamp()

    await bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 5,
        }
    })

    const args = interaction.data?.options?.map(map => map.value) || [];
    command.run(bot, args, message);

    message.channel.send = oldSend;
}