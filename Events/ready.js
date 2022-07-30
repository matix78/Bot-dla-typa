const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env.TOKEN
const config = require("../config")
const clientId = config.clientId
module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        console.log('Bot jest online');
        const rest = new REST({ version: '9' }).setToken(token);
        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');
                for (let i = 0; i < client.guilds.cache.size; i++) {
                    await rest.put(
                        Routes.applicationGuildCommands(clientId, client.guilds.cache.at(i).id),
                        { body: client.commandArray },
                    );
                }

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    },
}
