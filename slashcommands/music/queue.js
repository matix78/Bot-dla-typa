const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { Player } = require('discord-player');
let player;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Wyświetla piosenki które są w kolejce')
        .addNumberOption((option) =>
            option
                .setName('page')
                .setDescription('Numer strony kolejki')
                .setMinValue(1)
        ),
    async execute(inter) {
        if (!player) {
            player = new Player(inter.client);
        }
        const queue = player.getQueue(inter.guildId);
        if (!queue || !queue.plaing) return await inter.reply('Nie ma żadnych piosenek w kolejce!')

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1
        const page = (inter.options.getNumber('page') || 1)

        if (page > totalPages) return await inter.reply(`Błędna strona. Ta lista posiada ${totalPages} stron piosenek`)

        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
        }).join("\n")

        const currentSong = queue.current;
    }
}
