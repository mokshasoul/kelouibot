/**
 * @author Charis-Nicolas Georgiou <cng_it@posteo.net>
 * @see https://github.com/moksha/keluibot
 * @copyright 2018
 * @license GPLv3
 */
"use strict";
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const SHAME_URI = 'https://www.youtube.com/watch?v=SrDSqODtEFM'

module.exports =
    /**
     * @param {Client} client
     * @param {Message} msg
     */
    function shame(client, msg) {
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.join().then(
                connection => {
                    const stream = ytdl(SHAME_URI, { filter: 'audioonly' });
                    const dispatcher = connection.playStream(stream, streamOptions);
                    dispatcher.on('error', (err) => {
                        console.log(err);
                    });
                    dispatcher.on('end', () => {
                        connection.channel.leave()
                    });
                }).catch(console.log);
        } else {
            msg.reply("No voice channel found");
        }
        return 1;
    }