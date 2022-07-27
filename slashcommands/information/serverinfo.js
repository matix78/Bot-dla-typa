const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Wyświetla informacje o serverze'),

    async execute(inter) {
        const { guild } = inter;
        const { createdTimestamp, ownerId, members, memberCount, channels, emojis, stickers } = guild;
        const embed = new Discord.MessageEmbed()
            .setColor('PURPLE')
            .setAuthor({ name: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) })
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                {
                    name: '**Ogólne**',
                    value: [
                        `Nazwa: ${guild.name}`,
                        `Utworzono: <t:${parseInt(createdTimestamp / 1000)}:R>`,
                        `Właściciel: <@${ownerId}>`,
                    ].join('\n')
                },
                {
                    name: '**Użytkownicy**',
                    value: [
                        `- Użytkownicy: ${members.cache.filter((m) => !m.user.bot).size}`,
                        `- Boty: ${members.cache.filter((m) => m.user.bot).size}`,
                        `Ogólnie: ${memberCount}`,
                    ].join('\n')
                },
                {
                    name: '**Kanały**',
                    value: [
                        `- Tekstowe: ${channels.cache.filter((c) => c.type === 'GUILD_TEXT').size}`,
                        `- Głosowe: ${channels.cache.filter((c) => c.type === 'GUILD_VOICE').size}`,
                        `- Wątki: ${channels.cache.filter((c) => c.type === 'GUILD_NEWS_THREAD' && 'GUILD_PRIVATE_THREAD' && 'GUILD_PUBLIC_THREAD').size}`,
                        `- Kategorie: ${channels.cache.filter((c) => c.type === 'GUILD_CATEGORY').size}`,
                        `- Podium: ${channels.cache.filter((c) => c.type === 'GUILD_STAGE_VOICE').size}`,
                        `- Aktualności: ${channels.cache.filter((c) => c.type === 'GUILD_NEWS').size}`,
                        `Ogólnie: ${channels.cache.size}`,
                    ].join('\n')
                },
                {
                    name: 'Emoji oraz naklejki',
                    value: [
                        `- Animowane: ${emojis.cache.filter((e) => e.animated).size}`,
                        `- Zwykłe: ${emojis.cache.filter((e) => !e.animated).size}`,
                        `- Naklejek: ${stickers.cache.size}`,
                        `Ogólnie: ${stickers.cache.size + emojis.cache.size}`,
                    ].join('\n')
                },
                {
                    name: '**Statystki NITRO**',
                    value: [
                        `- Role: ${guild.roles.cache.size}`,
                        // `- Poziom: ${guild.premiumTier.replace('TIER_', '')}`,
                        `- Boosty: ${guild.premiumSubscriptionCount}`,
                        `- Boosterzy: ${members.cache.filter((m) => m.premiumSince).size}`,
                    ].join('\n')
                }
            )
            .setFooter({ text: `Ostatnio sprawdzane:` })
            .setTimestamp()

        inter.reply({ embeds: [embed] })
    }
}