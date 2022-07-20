const { Permissions: { FLAGS } } = require('discord.js')
const Discord = require('discord.js');

module.exports = 
{
    name: 'kick',
    description: 'Wyrzuca użytkowników',
    usage: 'kick (osoba) (powód)',
    args: true,
    cooldown: 5,
    aliasses: ['wyrzuć', 'wyrzuc'],
    botPermisions: [FLAGS.KICK_MEMBERS],
    userPermisions: [FLAGS.KICK_MEMBERS],

    execute: async(message, args) =>
    {
        const {channel, guild, author, mentions, commandName} = message;
        const ReasonArg = [...args].slice(1).join(' ');
        const userToKick = mentions.users.first();

        if(!userToKick)
        {
            return message.reply('Ten użytkownik nie istnieje.');
        }

        if(userToKick.id === author.id)
        {
            return message.reply('Nie możesz siebie wyrzucić!');
        }

        const memberToKick = guild.members.cache.get(userToKick.id);

        if(!memberToKick.kickable)
        {
            return channel.send('Potrzebuje więcej uprawnień by móc wyrzucić.');
        }

        memberToKick.kick(ReasonArg).then(kickedUser =>
            {
                const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('**KICK**')
                .setDescription(`**Użytkownik** \`${memberToKick.displayName}\` **został wyrzucony przez** ${message.author}.\n${ReasonArg ? `\n**Powód:** ${ReasonArg}` : ''}`)
                .setTimestamp()
                .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({dynamic : true}) });

                return message.channel.send({embeds: [embed]})
            
                
        })
    }
}
