const Discord = require("discord.js");
const superagent = require("superagent")

module.exports.run = async (bot, message, args) => {

    let msg = await message.channel.send("Generating...")

    let {body} = await superagent
    .get('https://dog.ceo/api/breeds/image/random')
    //console.log(body.file)
    if(!{body}) return message.channel.send("I failed, try again.")

        let dogembed = new Discord.RichEmbed()
        .setColor("#0f6185")
        .setAuthor(`DOG!`, message.guild.iconURL)
        .setImage(body.message)
        .setTimestamp()
        .setFooter(`pChan`, bot.user.displayAvatarURL)
        message.delete()
        await msg.delete(300)
    



    message.channel.send(dogembed);
}

module.exports.help = {
  name:"dog"
}
