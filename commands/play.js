const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { Player, RepeatMode } = require("discord-music-player");


module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Plays music from youtube',
    async execute(client, message, args, Discord){
        const voiceChannel = message.member.voice.channel;
        
        if (!voiceChannel) return message.reply(`You aren't connect to any voice channel!`);
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT')) return message.reply(`You don't have permissions for that`)
        if(!permissions.has('SPEAK')) return message.reply(`You don't have permissions for that`)
        if(!args[0]) return message.reply("No parameters given");

        const player = new Player(client, {
            leaveOnEmpty: false,
        });
        client.player = player;

        let serverQueue = client.player.getQueue(message.guild.id);
        let queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);

        let song = await queue.play(args.join(' ')).catch(_ => {
            if(!serverQueue)
                queue.stop();
        });
    }
}