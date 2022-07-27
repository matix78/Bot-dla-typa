const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { QueryType, Player } = require('discord-player');
let player;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Gra wybraną piosenkę')
        .addSubcommand((subcommand) => 
        subcommand
        .setName('song')
        .setDescription('Wklej link URL który chcesz odtworzyć')
        .addStringOption((option) =>
        option
        .setName('url')
        .setDescription('Piosenka z URL')
        .setRequired(true)
        ))
        .addSubcommand((subcommand) =>
        subcommand
        .setName('playlist')
        .setDescription('Załaduj playliste piosenek z adresów URL')
        .addStringOption((option) =>
        option
        .setName('url')
        .setDescription('Playlista z adresów URL')
        .setRequired(true)
        ))
        .addSubcommand((subcommand) =>
        subcommand
        .setName('search')
        .setDescription('Szuka piosenek na podstawie nazwy wprowadzonej z klawiatury')
        .addStringOption((option) =>
        option
        .setName('searchterms')
        .setDescription('Szukanie z nazwy wprowadzonej z kalwiatury')
        .setRequired(true)
        )),
    async execute(inter) {
        if(!player){
            player = new Player(inter.client);
        }
        if(!inter.member.voice.channel) return inter.reply('Musisz być na kanale głosowym aby móc użyć tej komendy!');
        const queue = player.createQueue(inter.guild, {
            metadata: {
                channel: inter.channel
            }
        });
        if(!queue.connection) await queue.connect(inter.member.voice.channel);

        let embed = new Discord.MessageEmbed()

        if(inter.options.getSubcommand() === 'song'){
            let url = inter.options.getString('url');
            const result = await player.search(url, {
                requestedBy: inter.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            
            if(result.tracks.length === 0) return inter.reply('Brak wyników')

            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
            .setDescription(`**[${song.title}] (${song.url})** został dodany do kolejki!`)
            .setThumbnail(song.thumbnail)
            .setFooter({ text: `Trwanie: ${song.duration}`})
        }else if(inter.options.getSubcommand() === 'playlist'){
            let url = inter.options.getString('url');
            const result = await player.search(url, {
                requestedBy: inter.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })
            if(result.tracks.length === 0) return inter.reply('Brak wyników')

            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
            .setDescription(`**${result.tracks.length} piosenek [${playlist.title}] (${playlist.url})** zostało dodanych do kolejki!`)
            .setThumbnail(song.thumbnail)
        }else if(inter.options.getSubcommand() === 'search'){
            let url = inter.options.getString('searchterms');
            const result = await player.search(url, {
                requestedBy: inter.user,
                searchEngine: QueryType.AUTO
            })
            if(result.tracks.length === 0) return inter.reply('Brak wyników')

            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
            .setDescription(`**[${song.title}] (${song.url})** został dodany do kolejki!`)
            .setThumbnail(song.thumbnail)
            .setFooter({ text: `Trwanie: ${song.duration}`})
            
            if(!queue.playing) await queue.play()
            await inter.reply({embeds: [embed]})
        }
    },
}