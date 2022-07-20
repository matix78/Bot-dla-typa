const { Permissions: { FLAGS } } = require('discord.js')
const Discord = require('discord.js');
const ms = require('ms');

module.exports = 
{
    name: 'giveaway',
    description: 'Robi konkursy',
    usage: 'giveaway (nazwa komendy)',
    aliasses: [''],
    botPermisions: [FLAGS.ADMINISTRATOR],
    userPermisions: [FLAGS.ADMINISTRATOR],

    execute: async(message, channel, client, args) =>
    {
        /*const channel = message.metions.channels.first();
        if(!channel) return message.channel.send('Proszę podać prawidłowy kanał!');

        const duration = args[1];
        if(!duration) return message.channel.send('Proszę podać prawidłowy czast trwania!');

        const winners = args[2];
        if(!winners) return message.channel.send('Proszę podać prawidłową nazwę!');

        const prize = args.slice(3).join(' ');
        if(!prize) return message.channel.send('Proszę podać prawidłową nagrodę!');*/
    }
}