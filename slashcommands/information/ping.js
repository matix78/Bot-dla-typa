const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Wyświetla aktualny ping bota'),

    async execute(inter) {
        const embed = new Discord.MessageEmbed()
            .setTitle('**PONG!**')
            .setColor('RANDOM')
            .setDescription(`${Date.now() - inter.createdTimestamp}ms`)
        inter.reply({ embeds: [embed] });
    },
}