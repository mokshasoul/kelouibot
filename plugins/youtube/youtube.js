/**
 * @author Charis-Nicolas Georgiou <cng_it@posteo.net>
 * @see https://github.com/moksha/keluibot
 * @copyright 2018
 * @license GPLv3
 */
'use strict';
// Imports
const youtube_node = require("youtube-node");
const auth = require("../../auth.json");

// CONSTANT VARS
const YT_WATCH_URI = "https://www.youtube.com/watch?v=";

function YouTubeClient() {
    this.RickrollUrl = 'http://www.youtube.com/watch?v=oHg5SJYRHA0';
    this.ytclient = new youtube_node();
    this.ytclient.setKey(auth.youtube_api_key);
    this.ytclient.addParam('type', 'video');
};
YouTubeClient.prototype.respond =  function (query, channel, client) {
    var that = this;
    //TODO: Fail gracefully if item does not exist
    this.ytclient.search(query, 1, function (error, result) {
    if (error) {
        console.log(error);
        channel.send("Ti sto poutso, estilamente lathos");
        channel.send(that.RickrollUrl);
    } else {
        if (result && result.items &&
            result.items.length > 0) {
            channel.send(YT_WATCH_URI +
                result.items[0].id.videoId);
        } else {
            channel.send("Ti sto poutso m estilate re kopelia en ivra tpt me tto " + query);
        }
    }});
};
module.exports = {
    YouTubeClient: YouTubeClient
}