/**
 * @author Charis-Nicolas Georgiou <cng_it@posteo.net>
 * @see https://github.com/moksha/keluibot
 * @copyright 2018
 * @license GPLv3
 */
"use strict";

module.exports =
    /**
     * @param {Client} client
     * @param {Message} msg
     */
    function shame(client, msg) {
        const broadcast = client.createVoiceBroadcast();
        broadcast.playFile('C:/PWS/keluibot/plugins/shame/shame.ogg');
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.join().then(
                connection => {
                    //msg.reply("Connected!");
                    var dispatcher = connection.playBroadcast(broadcast)
                    dispatcher.on('end', () => {
                        connection.channel.leave()
                    })
                }).catch(console.log);
        } else {
            msg.reply("No voice channel found");
        }
        return 1;
    }