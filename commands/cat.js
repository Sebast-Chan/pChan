const Discord = require("discord.js");
const superagent = require("superagent")

module.exports.run = async (bot, message, args) => {

    let msg = await message.channel.send("Generating...")

    let {body} = await superagent
    .get('http://aws.random.cat/meow')
    //console.log(body.file)
    if(!{body}) return message.channel.send("I failed, try again.")

        let catembed = new Discord.RichEmbed()
        .setColor("#0f6185")
        .setAuthor(`CATS!`, message.guild.iconURL)
        .setImage(body.file)
        .setTimestamp()
        .setFooter(`pChan`, bot.user.displayAvatarURL)
        message.delete()
        await msg.delete(300)
    



    message.channel.send(catembed);
}

module.exports.help = {
  name:"cat"
}
