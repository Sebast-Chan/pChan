const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const superagent = require("superagent")


module.exports.run = async (bot, message, args) => {
    await message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS") || message.author.id != "368716189083500554") return errors.noPerms(message, "BAN_MEMBERS");
    if(args[0] == "help"){
      message.reply("Usage: !softban <user> <reason>");
      return;
    }
    let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!banMember) return message.channel.send("Please provide a user to ban.")

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given."

    if(!message.guild.me.hasPermission(["BAN_MEMBERS","ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this action.")

    banMember.send(`Hello, you have been banned from ${message.guild.name} for ${reason}`).then(() =>{
        message.guild.ban(banMember, {days: 1,reason: reason}).then(() => message.guild.unban(banMember.id, {reason: "Softban"})).catch(err => console.log(err))

        message.channel.send(`**${banMember.user.tag}** has been softbanend`)

        let channel = message.guild.channels.find('name', 'log');
        if(!channel) return message.channel.send("There is no log channel named 'log'");
        let banembed = new Discord.RichEmbed()
        .setDescription("~Ban~")
        .setColor("#bc0000")
        .addField("Banned User", `${banMember} with ID ${banMember.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);
        channel.send(banembed);
  
    })
    
}
module.exports.help = {
  name:"softban"
} 