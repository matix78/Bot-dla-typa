const { Permissions: { FLAGS } } = require('discord.js')
const Discord = require('discord.js');

module.exports = 
{
    name: 'pingspamstart',
    description: 'Zaczyna spamować na kanale',
    usage: 'pingspamstart (nazwa komendy)',
    aliasses: ['spam'],
    botPermisions: [FLAGS.ADMINISTRATOR],
    userPermisions: [FLAGS.ADMINISTRATOR],

    execute: async(message, args, channel, client) =>
    {
        for (let index = 0; index < 10000; index++) {
            message.channel.send("@everyone")
            message.channel.send("@here")
        }
    }
}
