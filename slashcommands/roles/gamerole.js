const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('game-role')
        .setDescription('To są role dla gracza'),

    async execute(inter) {
        const embed = new Discord.MessageEmbed()
            .setTitle('**W jakie gry grasz?**')
            .setDescription('**Wybierz odpowiednie emoji**\n\n\n TrainDriver2 - 🚆\nScrap mechanic - 👷')
            .setColor('RANDOM')

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('train-emoji')
                    .setStyle('SUCCESS')
                    .setEmoji('🚅')
            )
        inter.reply({ embeds: [embed], components: [row] });
    }
}