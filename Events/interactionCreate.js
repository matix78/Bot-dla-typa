const Discord = require('discord.js');
const { Permissions: { FLAGS } } = require('discord.js');

module.exports = {
    name: 'interactionCreate',

    async execute(inter, client) {
        if (inter.isButton()) {
            if (inter.customId === 'delete-ticket') {
                const permision =
                    [
                        'ADMINISTRATOR',
                        'KICK_MEMBERS'
                    ]

                inter.deferUpdate()
                if (!permision.some((element, index, array) => {
                    return inter.member.permissions.has(element);
                })) {
                    const ownTicket = new Discord.MessageEmbed()
                        .setDescription('Tylko administratorzy i moderatorzy mogą zamknąć ticket!')
                        .setColor('RED')

                    const fail = await message.channel.send({ embeds: [ownTicket] }); setTimeout(() => { fail.delete() }, 5000); return
                }
                const closeEmbed = new Discord.MessageEmbed()
                    .setDescription('Kanał zostanie usunięty za **5** sekund!')
                    .setColor('RED')

                inter.channel.send({ embeds: [closeEmbed] })

                setTimeout(() => {
                    inter.channel.delete()
                }, 5000)
            }
            if (inter.customId === 'player-support') {
                if (inter.user.id === true) {
                    const alreadyOpen = new Discord.MessageEmbed()
                        .setDescription('Ticket został utworzony!')
                        .setColor('DARK_RED')
                    return await inter.reply({ embeds: [alreadyOpen] });
                }
                const ButtonsEmbedRow = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('close-ticket')
                            .setStyle('PRIMARY')
                            .setEmoji('🔒')
                            .setDisabled(true),
                        new Discord.MessageButton()
                            .setCustomId('open-ticket')
                            .setStyle('SUCCESS')
                            .setEmoji('🔓')
                            .setDisabled(true),
                        new Discord.MessageButton()
                            .setCustomId('delete-ticket')
                            .setStyle('DANGER')
                            .setEmoji('❌'),
                    )

                inter.guild.channels.create(`ticket-${inter.user.username}`, {
                    permissionOverwrites: [
                        {
                            id: inter.user.id,
                            allow: [FLAGS.SEND_MESSAGES, FLAGS.VIEW_CHANNEL, FLAGS.ATTACH_FILES]
                        },
                        {
                            id: inter.guild.roles.cache.get('962485866389966858'),
                            allow: [FLAGS.VIEW_CHANNEL, FLAGS.SEND_MESSAGES]
                        },
                        {
                            id: inter.guild.roles.everyone,
                            deny: [FLAGS.VIEW_CHANNEL]
                        }
                    ], parent: '994924153192849448', topic: inter.user.id
                }).then(async c => {
                    const thanksEmbed = new Discord.MessageEmbed()
                        .setDescription(`${inter.user} dziękujęmy za otwarcie ticketu, nasz zepsół postara się pomóc!\n Opisz nam swój problem na dole`)
                        .setColor('RED')

                    c.send({ embeds: [thanksEmbed], components: [ButtonsEmbedRow] })

                    const openEmbed = new Discord.MessageEmbed()
                        .setDescription(`Ticket został otwarty! ${c}`)
                        .setColor('RED')

                    await inter.reply({ embeds: [openEmbed], ephemeral: true })
                })
            }
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
}