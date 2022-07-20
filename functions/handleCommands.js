const fs = require('fs');
module.exports = (client) => {
    client.handleCommands = async (slashCommands, path) => {
        client.commandArray = [];
        for (folder of slashCommands) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../slashcommands/${folder}/${file}`);

                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }

        }

    };
};