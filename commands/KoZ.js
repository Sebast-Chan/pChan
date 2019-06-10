const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let replies = ["https://leonardodavinci.stanford.edu/submissions/clabaugh/today/images/euroBack.jpg","https://www.elzapoppin.it/wp-content/uploads/2017/10/italy1euro.jpg"]
let result = Math.floor((Math.random() * replies.length));
let embed = new Discord.RichEmbed()
.setColor("#eaff63")
.setImage(replies[result])
.setAuthor("Head or Number")

message.channel.send(embed);
}

module.exports.help = {
    name:"flip"
}