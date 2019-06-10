const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    let commandembed = new Discord.RichEmbed()
    .setColor("#0061ff")
    .setDescription("**Commands without Prefix**")
    .addField("**Gif Responds**", "gn8,wtf,lol")
    .addField("**Text Responds**","moin,film(1-5)")
    message.channel.send(commandembed);

  }
  module.exports.help = {
    name: "commands"
  }
