const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

await message.delete();

let kissUserr = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
let selfslapembed = new Discord.RichEmbed()
.addField("**Nobody wants a kiss from you ufffff**","**Reeeeeeeeeeeeeeeeeeekt😝 😂**")
.setColor("#4196ff")
if(!kissUserr) return message.channel.send(selfslapembed);


let slapembed = new Discord.RichEmbed()
.addField("**Awwwww**",`**<@${message.author.id}> Kisses ${kissUserr} without a delay!😍**`)
.setColor("#4196ff")
.setImage('https://cdn.weeb.sh/images/ryFdQRtF-.gif')
message.channel.send(slapembed)
}


module.exports.help = {
  name: "kiss"
}
