const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('Wyświetla informacje o użytkowniku')
        .addUserOption(user => 
            user
            .setName('user')
            .setDescription('Wybierz użytkownika którego chcesz zobaczyć informacje')
            .setRequired(true)
        ),

    async execute(inter) {
        const user = inter.options.getUser('user');
        const Response = new Discord.MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: inter.user.avatarURL({dynamic : true}) })
        .setColor('RANDOM')
        .addField('UserID', `${user.id}`, false)
        // .addField('Role', `${user.roles.cache.map(r => r).join(' ').replace('@everyone', ' ')}`)

        inter.reply({embeds: [Response]})
    }
}