const Discord = require('discord.js');

module.exports = 
{
    name: 'serverinfo',
    description: 'Wyświetla informacje o serverze',
    usage: 'serverinfo (nazwa komendy)',
    cooldown: 5,
    aliasses: ['si'],
    execute: async (message, args, client, guild) => {
        const date = new Date(message.guild.createdAt).toLocaleDateString('ca-iso8601');
        //const afkChannel = message.guild.afkChannel;
        const avatarserver = message.guild.iconURL({dynamic: true});          
        //if(afkChannel == null ) afkChannel = 'brak';*/
        const embed = new Discord.MessageEmbed()
        .setTitle('**INFO O SERVERZE**')
        .setColor('RANDOM')
        .addField('Właściciel', `<@${message.guild.ownerId}> ID: (${message.guild.ownerId})`)
        .addField('Data założenia:', date)
        .addField('Ilość osób: ', `${message.guild.memberCount}`)
        .addField('Ikonka servera: ', `[LINK](${avatarserver})`)
        //.addField('Kanał AFK: ', afkChannel)

        message.channel.send({embeds: [embed]})
    }
}

