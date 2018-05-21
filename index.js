/**
 * @author Charis-Nicolas Georgiou <cng_it@posteo.net>
 * @see https://github.com/moksha/keluibot
 * @copyright 2018
 * @license GPLv3
 */
'use strict';
// Imports -- External
const Discord = require('discord.js');

//Imports -- Internal
const yt = require('./plugins/youtube/youtube.js');
const utils = require('./utils.js');

// Configs
const auth = require('./auth.json');
var Config = {};
try {
    var Config = require('./config.json');
} catch (e) {
    console.log(e.stack);
    console.log(process.version);
    console.log('Please create config file');
}
Config.commandprefix = '!';
var yt_client = new yt.YouTubeClient();
// Main
const client = new Discord.Client();
console.log('Booting keluiBot\n');

var commands = {
    'whofuckedup': {
        usage: '!whofuckedup',
        description: 'our very own hello world',
        process: function (client, msg, suffix) {
            msg.channel.send("AAAHHH REEE ILIAAAA AAAHH\n");
        }
    },
    'youtube': {
        usage: "!youtube <search term>",
        description: "pulls a list of videos from youtube",
        process: function (client, msg, suffix) {
        console.log(yt_client);
        yt_client.respond(suffix, msg.channel, client);
        }
    },
    'say': {
        usage: '!say <message>',
        description: 'bot repeats a messsage',
        process: function (client, msg, suffix) {
            msg.channel.send("Kalimeres o " + msg.author.username +
                " ipe m na sas po " + suffix);
        }
    },
    'help': {
        usage: '!help',
        description: 'Displays help',
        process: function (client, msg, suffix) {
            msg.channel.send(list_available_commands())
        }
    }
}
//TODO: Redo in markdown template
function list_available_commands() {
    if (typeof commands === 'undefined'){
        return "No commands registered with bot"
    } else {
        var reply = "List of commands:\nName\tDesc\t\Usage"
        var reply = reply + "\n" + "-".repeat(8) + "\n"
       for(var command in commands) {
            reply = reply + command +":\t" + 
            commands[command].description + "\t" + commands[command].usage + "\n";
       }
       return reply
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