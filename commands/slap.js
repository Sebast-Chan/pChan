const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
await message.delete();


let slap = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
let selfslapembed = new Discord.RichEmbed()
.addField("**N-NANI?!!!**",`**${message.author} is punshing himself!**`)
.setColor("#4196ff")
.setImage('http://i.imgur.com/Tse3UlB.gif')
if(!slap) return message.channel.send(selfslapembed);

let slapembed = new Discord.RichEmbed()
.addField("**Oh shit**",`**<@${message.author.id}> is slapping the sh*t out of ${slap}**`)
.setColor("#4196ff")
.setImage('https://cdn.weeb.sh/images/SkNimyKvZ.gif')

message.channel.send(slapembed);

}
module.exports.help = {
  name: "slap"
}
