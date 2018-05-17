/**
 * @author Charis-Nicolas Georgiou <cng_it@posteo.net>
 * @see https://github.com/moksha/keluibot
 * @copyright 2018
 * @license MIT
 */
'use strict';
// import discord.js
const Discord = require('discord.js');

console.log('Booting keluiBot\n');

var auth = require('./auth.json');

// Create a new discord client
const client = new Discord.Client();

var Config = {};
try {
    var Config = require('./config.json');
}catch (e){
    console.log(e.stack);
    console.log(process.version);
    console.log('Please create config file');
}

Config.commandprefix = '!';

var commands = {
    'whofuckedup' : {
        description: 'our very own hello world',
        process: function(bot, msg, suffix) {
            var text = 'ilias ofc\n';
            msg.channel.send(text);
        }        
    } 
}

client.on('ready', () => {
    // Greet the channel
    console.log('Serving channels' + client.channels.size);
});
client.on('message', msg => {
    if (msg.content === "ping") {
        msg.reply('pong');
    }
    if(msg.content === "!gamoton") {
        msg.reply('gamo ton ilia');
    }
});

if (auth.token) {
    console.log('Logging in with token');
    client.login(auth.token);
} else {
    console.log('Please add your bot token to auth.json.\n Terminating!')
}