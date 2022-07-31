const fs = require('fs');
module.exports = (client) => {
    const commandFolders = fs.readdirSync(process.cwd() +'/slashcommands');

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./slashcommands/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            console.log(folder)
            console.log(file)
            const command = require(__dirname+`/../slashcommands/${folder}/${file}`);
        
            client.commands.set(command.name, command)
        }
    }
}