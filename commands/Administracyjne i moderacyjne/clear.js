const { Permissions: { FLAGS } } = require('discord.js')
const Discord = require('discord.js');

module.exports = 
{
    name: 'clear',
    description: 'Wyczyszcza wiadomości',
    usage: 'clear (ilość)',
    args: true,
    guildOnly: true,
    cooldown: 5,
    aliasses: ['wyczysc', 'purge', 'wyczyść', 'usuń'],
    botPermisions: [FLAGS.MANAGE_MESSAGES],
    userPermisions: [FLAGS.MANAGE_MESSAGES],

    execute: async(message, args) =>
    {
        
        const amount = (+args[0])

        if(!amount) return message.channel.send('Nie podales żadnej liczby');

        if(amount < 2 || amount > 100)
        {
            return message.channel.send('**Ilość wiadomości do usunięcia musi być w przedziale od 2 do 100!**');
        }

        message.channel.bulkDelete(amount);
        
    }

}