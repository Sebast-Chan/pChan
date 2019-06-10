const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  message.delete();
  if(!message.member.hasPermission(["MANAGE_MESSAGES","ADMINISTRATOR"]) || message.author.id !='368716189083500554') return message.channel.send("You wish so right ^^")
  
  let argsresult;
  let mChannel = message.mentions.channels.first()

  message.delete()
  if(mChannel) {
    argsresult = args.slice(1).join(" ")
    mChannel.send(argsresult)
  } else {
    argsresult = args.join(" ")
    message.channel.send(argsresult)
  }
}

module.exports.help = {
  name: "say"
}
