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

    message.channel.send = async (embed) => {
        bot.api.webhooks(bot.user.id, interaction.token).messages('@original').patch({
            data: {
                embeds: [embed]
            }
        });
        return message.channel.messages.cache.get((await bot.api.webhooks(bot.user.id, interaction.token).messages('@original').get()).id);
    }

    await bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 5,
        }
    })

    const args = interaction.data?.options?.map(map => map.value) || [];
    command.run(bot, args, message);
}