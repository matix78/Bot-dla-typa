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
        const statuses = [
            { name: 'Spotify', type: 'LISTENING' },
            { name: 'CoinLabiryntCollect', type: 'PLAYING' },
            { name: `${client.guilds.cache.size} serwery`, type: 'WATCHING' },
            { name: 'komendy', type: 'WATCHING'},
        ];
        setInterval(() => {
            var randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            client.user.setActivity(randomStatus);
        }, 10000);
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