const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    let helpembed = new Discord.RichEmbed()
    .setColor("#15f153")
    .setDescription("**Member Commands**")
    .addField("**Economy**","coins, pay, level")
    .addField("**Info**","botinfo, serverinfo, botowner,info")
    .addField("**Report**","report")
    .addField("**More commands**","commands")
    .addField("**Interactions with other people**","bully,kiss,punch,slap,pat")
    .addField("**Pic&Gifs**","dog,cat,meme")
    .addField("**Broken**","meme")
    .addBlankField()
    .addField("**Play Music**","**play**")
    .addField("**Stop Music**","**stop**")
    .addField("**Skip the Song**","**skip**")
    .addField("**Pause the Music**","**pause**")
    .addField("**Continue the Music**","**resume**")
    .addField("**See whats in the Queue**","**queue**")
    .addField("**Whats the current playing song?**","**np**")
    .addField("**Set a Volume(0.0-100.0)**","**volume**")
    .addField("**Music prefix**","**#**")
    message.channel.send(helpembed);

    if(message.member.hasPermission("ADMINISTRATOR")){
    let modembed = new Discord.RichEmbed()
    .setDescription("**Admin Commands**")
    .setColor("#ff0000")
    .addField("**Roles**","addrole, removerole")
    .addField("**Ban/Kick**","ban, kick")
    .addField("**Chat**","mute, unmute, clear, say")
    .addField("**Change the Command**","prefix")

      try{
        await message.author.send(modembed);
        message.react("✅")
        message.reply("Also look in ur PM's 😉")
      }catch(e){
        message.reply("Your DMs are locked. I cannot send you the Commands.")
      }
}
}
module.exports.help = {
  name:"help"
}
