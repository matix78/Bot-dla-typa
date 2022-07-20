const { Permissions: { FLAGS } } = require('discord.js')
const Discord = require('discord.js');

module.exports = 
{
    name: 'ban',
    description: 'Banuje użytkowników',
    usage: 'ban (osoba) (dni) (powód)',
    args: true,
    cooldown: 5,
    aliasses: ['zbanuj'],
    botPermisions: [FLAGS.BAN_MEMBERS],
    userPermisions: [FLAGS.BAN_MEMBERS],

    execute: async(message, args) =>
    {
        const {channel, guild, author, mentions} = message;

        let daysArg = +args[1];

        if(isNaN(daysArg))
        {
            if(daysArg < 0) daysArg = 0;
            if(daysArg > 7) daysArg = 7;
        }

        const ReasonArg = [...args].slice(isNaN(daysArg) ? 1 : 2).join(' ');
        const userToBan = mentions.users.first();

        if(!userToBan)
        {
            return message.reply('Użytkownik którego chcesz zbanować nie istnieje!');
        }

        if(userToBan.id === author.id)
        {
            return message.reply('Nie możesz siebie zbanować!');
        }

        const memberToBan = guild.members.cache.get(userToBan.id);

        if(!memberToBan.bannable)
        {
            return channel.send('Potrzebuje więcej uprawnień by móc zbanować.');
        }

        const banOptions = 
        {
            reason: ReasonArg,

        }

        if(isNaN(daysArg)) banOptions.days = daysArg;
        
        memberToBan.ban(banOptions).then((bannedUser) =>
            {
                channel.send(`Użytkownik \`${memberToBan.displayName}\` został zbanowany.\n${ReasonArg ? `**Powód:** \`${ReasonArg}\`` : ''}`,)
            });
    }

}