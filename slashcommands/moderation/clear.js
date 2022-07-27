const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Usuwa wiadomości')
        .addIntegerOption((option) => {
            return option
                .setName('amount')
                .setDescription('Ilość wiadomości do usunięcia')
                .setRequired(true)
        }),
    async execute(inter) {
        if (!inter.member.permissions.has('MANAGE_MESSAGES')) return inter.reply({ content: 'Nie posiadasz permisji do usuwania wiadomości!' });
        if (!inter.guild.me.permissions.has('MANAGE_MESSAGES')) return inter.reply({ content: 'Ja nie posiadam permisji do usuwania wiadomości!' });

        let amount = inter.options.getInteger('amount');

        if (isNaN(amount) || amount < 1) {
            return inter.reply({content: '**Proszę podać prawidłową liczbę waidomości do usunięcia w zakresie od 1 do 100**', ephemeral: true});
        }

        if(parseInt(amount) > 99){
            return inter.reply({content: '**Mogę usunąć 99 wiadomości tylko raz!**', ephemeral: true});
        }else {
            try {
                let { size } = await inter.channel.bulkDelete(amount);
                await inter.reply({content: `Usunięto ${size} wiadomości.`, ephemeral: true});
                
            } catch (error) {
                console.log(error);
                inter.reply({ content: 'Nie mogę usunąć wiadomości po 14 dniach!', ephemeral: true})
            }
        }

    }
}