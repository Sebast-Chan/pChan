const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
   //voting 
   let sugges = args.slice(0).join(" ");
if(!sugges) return message.reply("No Text found.")(5000);
message.delete(500);
let sugembed = new Discord.RichEmbed()
.setColor("#f46242")
.addField("Vote", sugges)
message.channel.send(sugembed).then(msg => {
   msg.react("✅")
    msg.react("✖")
})

}
    


module.exports.help = {
  name: "vote"
}
