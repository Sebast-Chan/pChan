const Discord = require("discord.js");
let coins = require("../coins.json");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {
  let uCoins = coins[message.author.id].coins;
  let curlvl = xp[message.author.id].level;
  let member = message.mentions.members.first() || message.member,
  user = member.user;
 await message.delete(500)

    let infoembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(message.member.highestRole.color)
    .setThumbnail(message.author.displayAvatarURL)
    .addField('**:bust_in_silhouette: | Username**', `${message.author.username}#${message.author.discriminator}` )
    .addField('**:id: | ID**', message.author.id)
    .addField('**:globe_with_meridians: | Discord Join Date**', message.author.createdAt)
    .addField("💸 | Coins",`${uCoins}`) 
    .addField(`💪 | Level`, `${curlvl}`)
    .addField("**:shield: | Roles**", message.member.roles.map(r => `${r}`).join(", "))
    .setTimestamp();
    message.channel.send(infoembed);
}

module.exports.help = {
  name:"info"
}
