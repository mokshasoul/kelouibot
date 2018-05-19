exports.commands = [
    "youtube"
]
// Imports
const youtube_node = require("youtube-node");
const auth = require("../../auth.json");
const yt_watch_uri = "https://www.youtube.com/watch?v=";

function YouTubeClient() {
    this.RickrollUrl = 'http://www.youtube.com/watch?v=oHg5SJYRHA0';
    this.ytclient = new youtube_node();
    this.ytclient.setKey(auth.youtube_api_key);
    this.ytclient.addParam('type', 'video');
    this.respond = function (query, channel, client) {
        this.ytclient.search(query, 1, function (error, result) {
            if (error) {
                channel.send("Ti sto poutso, estilamente lathos");
                channel.send(this.RickrollUrl);
            } else {
                if (!result || result.items ||
                    result.items.length < 1) {
                    channel.send(yt_watch_uri +
                        result.items[0].id.videoId);
                }
            }

        })
    }
};

exports.youtube = {
    usage: "<search term>",
    description: "pulls a list of videos from youtube",
    process: function (client, msg, suffix) {
        youtube_
    }
}