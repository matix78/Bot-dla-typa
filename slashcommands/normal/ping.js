
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    name: "ping",

    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Wyświetla aktualny ping bota'),
    executeInteraction: async (inter) => {
        
        const embed = new Discord.MessageEmbed()
            .setTitle('**PONG**')
            .setColor('RANDOM')
            .setDescription(`${Date.now() - inter.createdTimestamp}ms \nms. API Latency is ${Math.round(inter.client.ws.ping)}ms`)
        inter.reply({ embeds: [embed] });
    },


    execute: async (message, args) => {
message.reply("pong")
    }
}

