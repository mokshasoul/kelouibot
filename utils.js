/**
 * @author Charis-Nicolas Georgiou <cng_it@posteo.net>
 * @see https://github.com/moksha/keluibot
 * @copyright 2018
 * @license GPLv3
 */
'use strict';
/*
 * @param command: assume that we get a command like !<command> <suffix*>
 * where suffix is a string containing the second part of the command
 */
function tokenize_command(command) {
    var tokenized_command = {
        command: "",
        suffix: ""
    }
    // We use a tmp array to split, slice and map
    var tmp = command.split(" ")

    if (tmp.length < 2) {
        tokenized_command.command = tmp[0].replace("!", "");
        return tokenized_command;
    }else{
        tokenized_command.command = tmp[0].replace("!", "");
        tokenized_command.suffix = tmp.slice(1, tmp.length).reduce((prev, curr) => {
            return prev + " " + curr;
        });
    }
    return tokenized_command;
    };
module.exports = {
    tokenize_command: tokenize_command,
};