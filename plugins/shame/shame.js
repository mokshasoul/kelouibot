/**
 * @author Charis-Nicolas Georgiou <cng_it@posteo.net>
 * @see https://github.com/moksha/keluibot
 * @copyright 2018
 * @license GPLv3
 */
"use strict";

module.exports =  
function shame(client, msg) {
    const broadcast = client.createVoiceBroadcast();
    const test = broadcast.playFile('C:/PWS/keluibot/plugins/shame/shame.ogg');
    if(msg.member.voiceChannel) {
        msg.member.voiceChannel.join().then(
            connection => {
                //msg.reply("Connected!");
                var dispatch = connection.playBroadcast(broadcast);
                //connection.channel.leave();
                //msg.reply("Left!");
            })
            .catch(console.log);
    } else {
        msg.reply("No voice channel found" );
    } 
    return 1;
}