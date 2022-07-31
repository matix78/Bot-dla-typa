const config = require(__dirname+'/../config');
module.exports = (message,client) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const { channel, guild, prefix } = message

    const command = client.commands.get(commandName) || client.commands.find(command => command.aliasses && command.aliasses.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.guild === null) {
        return message.reply('Wiadomość nie może zostać wysłana na czacie prywatnym bota!')
    }

    if (command.botPermisions && command.botPermisions.length) {
        if (!guild.me.permissionsIn(channel).has(command.botPermisions)) {
            return channel.send(`Nie mam wystarczająco dużo permisji aby wykonać tą czynność! Potrzebuje : \`${command.botPermisions.join('`,`')}\`.`);
        }
    }

    if (command.userPermisions && command.userPermisions.length) {
        if (!message.member.permissionsIn(channel).has(command.userPermisions)) {
            return message.reply('Nie posiadasz permisji!');
        }
    }

    if (command.args && !args.length) {
        let reply = `Nie podałeś żadnego argumntu, ${message.author}!`

        if (command.usage) {
            reply += `\n Poprawne użycie tej komendy to: \`${config.prefix}${commandName} ${command.usage}\``
        }
        return message.channel.send(reply)
    }
/*
    if (!cooldowns.has(commandName)) {
        cooldowns.set(commandName, new Discord.Collection())
    }


    const now = Date.now();
    const timestamps = cooldowns.get(commandName);
    const cooldownAmount = (command.cooldown || 3) * 1000

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeleft = (expirationTime - now) / 1000
            return message.reply(`Proszę poczekaj ${timeleft.toFixed(1)} sekund zanim wyślesz ponownie \`${commandName}\`!`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => {
        timestamps.delete(message.author.id)
    }, cooldownAmount);
*/
    try {
        command.execute(message, args, client);
    }
    catch (error) {
        console.error(error);
        message.reply('Ta komenda nie działa!');
    }
}