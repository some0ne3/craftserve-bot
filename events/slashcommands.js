const Discord = require("discord.js");

const invite_regex = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/(\w{0,32})/i)
const fetch = require("node-fetch");
const config = require("../config.json");

const checkInvite = async(args, guild_id) => {

    const matches = args.join(' ').match(invite_regex)

    if(!matches) return false;

    const res = await fetch(`https://discord.com/api/invites/${matches[5]}`)
    const json = await res.json();

    return !(json.message && (json.message === "404: Not Found" || json.message === "Unknown Invite") || guild_id === json.guild.id || config.whitelistServers.includes(json.guild.id));
}


const getIdFromMention = (mention) => {
    const matches = mention.match(/^<@!?(\d+)>/);

    if (!matches) return;

    return matches[1];
}

module.exports = async (bot, interaction) => {
    const command = bot.commands.find(command => command.name === interaction.data.name)

    const guild = bot.guilds.cache.get(interaction.guild_id)

    const users = new Discord.Collection();

    for(const arg of interaction.data?.options?.map(map => map.value)[0].trim().split(/ +/g) || []) {
        const id = getIdFromMention(arg);
        if(id) {
            users.set(id, bot.users.cache.get(id))
        }
    }

    const message = {
        channel: guild.channels.cache.get(interaction.channel_id),
        member: guild.members.cache.get(interaction.member.user.id),
        author: bot.users.cache.get(interaction.member.user.id),
        mentions: {
            users: users,
        },
        guild: guild,
        createdTimestamp: Discord.SnowflakeUtil.deconstruct(interaction.id).timestamp,
    }

    const oldSend = message.channel.send;

    bot.embed = new Discord.MessageEmbed()
        .setColor(0x224d21)
        .setFooter(`Komenda /${command.name} | ${message.author.tag}`)
        .setTimestamp()

    const args = interaction.data?.options?.map(map => map.value)[0].trim().split(/ +/g) || [];

    let ephemeral = false;

    if(await checkInvite(args, message.guild.id) && !message.member?.hasPermission("MANAGE_MESSAGES")) ephemeral = true;

    await bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 5,
            data: {
                flags: ephemeral ? 1 << 6 : undefined,
            }
        }
    })

    message.channel.send = async (text, embed) => {
        bot.api.webhooks(bot.user.id, interaction.token).messages('@original').patch({
            data: {
                content: text,
                embeds: embed ? [embed] : undefined
            }
        });

        if(ephemeral) return message;

        return message.channel.messages.cache.get((await bot.api.webhooks(bot.user.id, interaction.token).messages('@original').get()).id);
    }

    await command.run(bot, args, message);

    message.channel.send = oldSend;
}
