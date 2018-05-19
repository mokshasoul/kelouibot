/**
 * @author Charis-Nicolas Georgiou <cng_it@posteo.net>
 * @see https://github.com/moksha/keluibot
 * @copyright 2018
 * @license GPLv3
 */
'use strict';

const Discord = require('discord.js');

console.log('Booting keluiBot\n');

const auth = require('./auth.json');
const utils = require('./utils.js');

// Create a new discord client
const client = new Discord.Client();

var Config = {};
try {
    var Config = require('./config.json');
} catch (e) {
    console.log(e.stack);
    console.log(process.version);
    console.log('Please create config file');
}
Config.commandprefix = '!';

var commands = {
    'whofuckedup': {
        description: 'our very own hello world',
        process: function (client, msg) {
            var text = 'ilias ofc\n';
            msg.channel.send(text);
        }
    },
    'youtube': {
        description: 'will be implemented',
        process: function (client, msg, suffix) {
            msg.channel.send("o mixalakis e vlakas");
        }
    },
    'say': {
        usage: '<message>',
        description: 'bot repeats a messsage',
        process: function (client, msg, suffix) {
            msg.channel.send("Kalimeres o " + msg.author.username +
                " ipe m na sas po " + suffix);
        }
    }
}
/*
 * Process commands and delegate them to the right processor
 *  msg.channel.send("HOMOCF23FBSM");
 */
function executeCommand(client, command, suffix, msg) {
    if (typeof suffix === 'undefined') {
        console.log("setting suffix to default value");
        suffix = "";
    }
    if (command in commands) {
        commands[command].process(client, msg, suffix);
    }
}
client.on('presence', (user, status) => {
    console.log(user + " " + status);
    const channel = client.channels.find('malakies');
    channel.send('Ntampo koumpare  ${user}');
});
client.on('ready', () => {
    // Greet the channel
    console.log('Serving channels: ' + client.channels.size);
});
client.on('message', msg => {
    if (msg.author.id !== client.user.id &&
        msg.content.startsWith(Config.commandprefix)) {
        console.log("Command: " + msg.content + " invoked by " + msg.author.username);
        var tokenized_command = utils.tokenize_command(msg.content);
        executeCommand(client, tokenized_command.command,
            tokenized_command.suffix, msg);
    }
});

if (auth.token) {
    console.log('Logging in with token');
    client.login(auth.token);
} else {
    console.log('Please add your bot token to auth.json.\n Terminating!');
}