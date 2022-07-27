const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { Permissions: { FLAGS } } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banuje użytkownika')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('Użytkownik którego chcesz zbanować')
                .setRequired(true)
        )
        .addStringOption((option) =>
        option
        .setName('reason')
        .setDescription('Powód zbanowania użytkownika')
        .setRequired(true)
        ),
    async execute(inter) {
        if(!inter.member.permissions.has(FLAGS.BAN_MEMBERS)) return inter.reply({ content: 'Nie masz wystarczająco permisji aby użyć tej komendy!', ephemeral: true});

        const user = inter.options.getUser('user');
        const member = inter.guild.members.cache.get(user.id) || await inter.guild.members.fetch(user.id).catch(err => {})

        if(!member) return inter.reply("Nie można uzyskać informacji o użytkowniku!");
        const reason = inter.options.getString('reason');

        if(!member.bannable || member.user.id === inter.user.id) 
        return inter.reply("Nie mogę zbanować tego użytkownika!");

        if(inter.member.roles.highest.position <= member.roles.highest.position) return inter.reply('Użytkownik ma wyższą rolę niż ja, dlatego nie mogę go zbanować!')

        const embed = new Discord.MessageEmbed()
        .setDescription(`**${member.user.tag}** został zbanowany z powodu \`${reason}\``)
        .setColor("RED")
        .setFooter({ text: inter.user.tag, iconURL: inter.user.avatarURL({ dynamic: true }) })
        .setTimestamp()

        await member.user.send(`Zostałeś zbanowany na serverze **\`${inter.guild.name}\`** z powodu \`${reason}\``).catch(err => {})
        member.ban({ reason })

        return inter.reply({ embeds: [ embed ]})

    }
}