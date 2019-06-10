const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    await message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS") || message.author.id != "368716189083500554") return errors.noPerms(message, "BAN_MEMBERS");
    if(args[0] == "help"){
      message.reply("Usage: !ban <user> <reason>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return errors.cantfindUser(message.channel);
    if(bUser.id === bot.user.id) return errors.botuser(message);
    let bReason = args.join(" ").slice(22);
    if(!bReason) return errors.noReason(message.channel);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, bUser, "MANAGE_MESSAGES");

    let channel = message.guild.channels.find('name', 'log');
    let banembed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);
    channel.send(banembed);
    var membersArray = message.mentions.users.array();

    for(var memberid in membersArray) {
      membersArray[memberid ].send(`Hey, you just got banned from the ${message.guild.name} server from an Admin.If you want to get unbanned pls message the server owner : ${message.guild.owner} , you're reason: ${bReason}`).then(function() {
      message.guild.ban(membersArray[memberid], {days: 0, reason: bReason})
    }).catch(function() {
      message.guild.ban(membersArray[memberid], {days: 0, reason: bReason})
    });
    }
  }
module.exports.help = {
  name:"ban"
}
