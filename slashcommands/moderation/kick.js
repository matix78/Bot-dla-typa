const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { Permissions: { FLAGS } } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Wyrzuca użytkownika')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('Użytkownik którego chcesz wyrzucić')
                .setRequired(true)
        )
        .addStringOption((option) =>
        option
        .setName('reason')
        .setDescription('Powód wyrzucenia użytkownika')
        .setRequired(true)
        ),
    async execute(inter) {
        if(!inter.member.permissions.has(FLAGS.KICK_MEMBERS)) return inter.reply({ content: 'Nie masz wystarczająco permisji aby użyć tej komendy!', ephemeral: true});

        const user = inter.options.getUser('user');
        const member = inter.guild.members.cache.get(user.id) || await inter.guild.members.fetch(user.id).catch(err => {})

        if(!member) return inter.reply("Nie można uzyskać informacji o użytkowniku!");
        const reason = inter.options.getString('reason');

        if(!member.kickable || member.user.id === inter.user.id) 
        return inter.reply("Nie mogę wyrzucić tego użytkownika!");

        if(inter.member.roles.highest.position <= member.roles.highest.position) return inter.reply('Użytkownik ma wyższą rolę niż ja, dlatego nie mogę go wurzucić!')

        const embed = new Discord.MessageEmbed()
        .setDescription(`**${member.user.tag}** został wyrzucony z powodu \`${reason}\``)
        .setColor("RED")
        .setFooter({ text: inter.user.tag, iconURL: inter.user.avatarURL({ dynamic: true }) })
        .setTimestamp()

        await member.user.send(`Zostałeś wyrzucony na serverze **\`${inter.guild.name}\`** z powodu \`${reason}\``).catch(err => {})
        member.kick({ reason })

        return inter.reply({ embeds: [ embed ]})

    }
}