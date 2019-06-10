const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

await message.delete();

let onepunch = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
let selfpunch = new Discord.RichEmbed()
.addField("N-NANI?!!!",`<@${message.author.id}> is punshing himself!`)
.setColor("#4196ff")
.setImage("http://i.imgur.com/Tse3UlB.gif")
if(!onepunch) return message.channel.send(selfpunch);

let onepunchembed = new Discord.RichEmbed()
.addField("O-O-O OMG",`<@${message.author.id}> is giving ${onepunch} the Fist! REKT BOOOOY`)
.setColor("#4196ff")
.setImage("https://cdn.weeb.sh/images/SyYbP6W-z.gif")
message.channel.send(onepunchembed);

}

module.exports.help = {
  name: "punch"
}
