const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Wyświetla avatar użytkownika')
        .addUserOption(option => 
            option
            .setName('user')
            .setDescription('Wybierz użytkownika którego chcesz zobaczyć avatar')
            .setRequired(true)
        ),

    async execute(inter) {
    const user = inter.options.getUser('user');
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setImage(user.avatarURL({dynamic: true, size: 1024}))
    .setDescription(`**Avatar użytkownika** ${user}\n\n[Kliknij tutaj](${user.avatarURL({ dynamic: true, size: 2048 })}) aby zobaczyć avatar w większej rozdzielczości.`)
    .setTimestamp()
    .setFooter({ text: inter.user.tag, iconURL: inter.user.avatarURL({ dynamic: true }) });

    inter.reply({ embeds: [embed] });
    }
}