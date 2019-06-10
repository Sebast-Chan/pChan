const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
  await message.delete();
if(message.member.hasPermission("MANAGE_MESSAGES") || message.author.id !== '368716189083500554') return errors.noPerms(message, "MANAGE_MESSAGES");
  if(!args[0]) return message.channel.send("oof");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
  });
}

module.exports.help = {
  name: "clear"
}
