const Discord = require("discord.js");
const ms = require("ms");
const errors = require("../utils/errors.js");
let tempmute = require("../mute.json");
module.exports.run = async (bot, message, args) => {

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find a User!.");
  if(tomute.hasPermission("MANAGE_MESSAGES") || message.author.id !='368716189083500554') return message.reply("Nooope");
  let muterole = message.guild.roles.find(`name`, "muted");
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MANAGES");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
//end of create role
  await(tomute.removeRole(muterole.id));
  message.reply(`<@${tomute.id}> is now unmuted!`);

//end of module
}

module.exports.help = {
  name: "unmute"
}
