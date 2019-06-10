const Discord = require("discord.js");
const ytdl = require('ytdl-core');

module.exports.run = async (client, message, args) => {
    // gets the members voice channel, and if their not in one reply
    let vc = message.member.voiceChannel;
    if(!vc) return message.channel.send("HEY, Join a Voice Channel!");

    // Gets the song, and if none is given reply
    let song = args[0];
    if(!song) return message.channel.send("Hey NO, give me a url to play!!");

    // checks if the link given is valid, if not reply
    let valid = ytdl.validateURL(song)
    if(!valid) return message.channel.send("HEY!! Thats not a valid link");

    // using ytdl to get some song info
    let info = await ytdl.getInfo(song);
    message.channel.send(info)

    // joins the members voice channel
    let connection = await vc.join();

    // plays the given song
    let dispatcher = connection.playStream(ytdl(song));
    dispatcher.on("end", () => message.channel.send("No more :("));
    message.channel.send(`Playing: ${info.title}`);

}
module.exports.help = {
  name:"play"
}
