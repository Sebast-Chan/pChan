const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let serverembed = new Discord.RichEmbed()
    .setTitle("Server Information")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
    .addField("**Server Name**", `${message.guild.name}`, true)
    .addField("**Server Owner**", `${message.guild.owner}`, true)
    .addField("**Member Count**", `${message.guild.memberCount}`, true)
    .addField("**Role Count**", `${message.guild.roles.size}`, true)
    .setFooter("pChan", bot.user.displayAvatarURL)

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"serverinfo"
}
