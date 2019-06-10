const Discord = require("discord.js");

module.exports.run = async (bot, message,args) => {

    let embed = new Discord.RichEmbed()
    .setDescription("All servers the bot is on")
    .addField("Guildcount",`${bot.guilds.size}`,true)

message.channel.send(embed);
}
module.exports.help = {
    name:"size"
}