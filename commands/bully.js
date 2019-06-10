const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

await message.delete();

let bullyUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
let bullyembed = new Discord.RichEmbed()
.addField("**God bless...**","**Couldn't find someone to bully :blush:**")
.setColor("#4196ff")
if(!bullyUser) return message.channel.send(bullyembed);


let slapembed = new Discord.RichEmbed()
.addField("**Oh No!**",`**<@${message.author.id}> is Bullying ${bullyUser}**`)
.setColor("#4196ff")
.setImage("http://i.imgur.com/h0IDW0z.gifv")
message.channel.send(slapembed);
}


module.exports.help = {
  name: "bully"
}
