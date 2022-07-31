const config = require('./config');
const Discord = require('discord.js');
const fs = require('fs');
const { Console } = require('console');
const { Permissions: { FLAGS } } = require('discord.js');
const functions = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./Events').filter(file => file.endsWith('.js'));
const slashCommands = fs.readdirSync('./slashcommands');
const handler = require("./handlers/command_handler")
const message_handler = require("./handlers/msg_handler")
require('dotenv').config()
const token = process.env.TOKEN

const client = new Discord.Client({
partials: ["CHANNEL", "MESSAGE", "REACTION"],
intents: (32767)
})
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();


( () => {
    client.login(token);
    for(file of functions){
        require(`./functions/${file}`)(client);
    }
    
    client.handlerevents(eventFiles, "./Events");
    client.handleCommands(slashCommands, "./slashcommands");
})();

handler(client)

const mentioned = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('Wykryto wzmiankę bota!')
    .setDescription(`Co chcesz odemnie, że mnie pingujesz?`)
    .setTimestamp()

client.on('messageCreate', async message => {
    message_handler(message,client)
/* idk co ten if robi to go też zakomentowałem
    if (message.mentions.users.map(user => user.id).includes(client.user.id)) return message.channel.send({ embeds: [mentioned] });

    if (message.content === 'xD' || message.content === 'xd' || message.content === 'XD' || message.content === 'Xd') {
        message.react('😂')
        message.react('🤣')
            .catch(() => console.log('Wystąpił błąd, emoji nie mogły zostać dodane'))
        return;
    }

    if (message.content === 'witam' || message.content === 'elo' || message.content === 'siema' || message.content === 'hej') {
        try {
            await message.react('🖐')
            await message.react('👋')
        } catch (error) {
            console.log('Wystąpił błąd, emoji nie mogły zostać dodane')
        }

        return;
    }
*/
});
module.exports = {client};


