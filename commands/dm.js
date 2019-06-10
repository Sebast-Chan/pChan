const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    mention = message.mentions.users.first();
  if(message.author.id !='368716189083500554') return;
    if (mention == null) {return;}
    message.delete();
    mentionMessage = message.content.slice(3);
    mention.send(mentionMessage);
   
}

module.exports.help = {
  name:"dm"
}
