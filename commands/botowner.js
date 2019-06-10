const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .addField("This is my Daddy","<@368716189083500554>")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("If you wanna add me","SebastChan#8888")
    message.channel.send(botembed);
}

module.exports.help = {
  name:"botowner"
}
