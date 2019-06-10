const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
await message.delete();

let slap = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
let selfpatembed = new Discord.RichEmbed()
.addField("**Awww**",`<@${message.author.id}> is patting himself.`)
.setColor("#4196ff")
.setImage("http://i.imgur.com/Hz0HOvu.gif")
if(!slap) return message.channel.send(selfpatembed);

let patembed = new Discord.RichEmbed()
.addField("**Awww**",`<@${message.author.id}> started patting ${slap} ^-^`)
.setColor("4196ff")
.setImage("https://cdn.weeb.sh/images/B1FqkJKPW.gif")
message.channel.send(patembed);
}
module.exports.help = {
  name: "pat"
}
