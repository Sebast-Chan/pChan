const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
let aTaged = message.mentions.users.first() || message.author;
let avatarembed = new Discord.RichEmbed()
.setTitle("Here you go!")
.setImage(`${aTaged.displayAvatarURL}`);
message.channel.send(avatarembed)
}
module.exports.help = {
  name:"avatar"
}