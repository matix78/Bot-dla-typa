const Discord = require('discord.js');
const { Permissions: { FLAGS } } = require('discord.js');

module.exports = {
    name: 'interactionCreate',

    async execute(inter, client) {
        if (!inter.isCommand()) return;

        const command = client.commands.get(inter.commandName);

        if (!command) return;

        try {
            await command.execute(inter);
        } catch (error) {
            console.error(error);
            await inter.reply({
                content: 'Wystąpił błąd w komendzie!',
                ephemeral: true
            });
        }
    }
}
