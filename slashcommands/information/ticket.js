const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Tworzy embed z ticketem'),

    async execute(inter) {
        const TicketEmbed = new Discord.MessageEmbed()
            .setDescription('**Kliknij w ikonkę aby utworzyć nowy ticket!**')
            .setColor('RED')

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('player-support')
                    .setStyle('DANGER')
                    .setEmoji('🎟️')
            )
        inter.reply({ embeds: [TicketEmbed], components: [row] });
    },
}
