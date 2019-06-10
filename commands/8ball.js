const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

//!8ball <question fjüiaf>
if(!args[0]) return message.reply("Thats not a Question")
let replies = ["Yes.","No.","I don't know.","Ask again later.","Yeet.","Your getting annoying."]

let result = Math.floor((Math.random() * replies.length));
let question =args.slice(0).join(" ");

let ballembed = new Discord.RichEmbed()
.setAuthor(message.author.tag)
.setColor("#f46242")
.addField("Question", question)
.addField("Answer", replies[result])

message.channel.send(ballembed);


}
module.exports.help = {
  name: "8ball"
}
