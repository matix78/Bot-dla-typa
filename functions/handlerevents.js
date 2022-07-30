module.exports = (client) => {
    client.handlerevents = async (eventFiles, path) => {
        for (const file of eventFiles) {
            const event = require(`../Events/${file}`);
            if(event.once) {
                console.log(`wywołana komenda:${file}`)
                client.once(event.name, (...args) => event.execute(...args, client));
            }else {
                console.log(`wywołana komenda2:${file}`)
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    };
}