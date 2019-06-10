const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const yourID = "368716189083500554";
const setupCMD = "!c"
const { Client, MessageAttachment } = require('discord.js');
var Long = require("long");
let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const roles = ["CS:GO","League of Legends","Rainbow Six Siege", "Warframe","9kek user","Friend"];
const reactions = [":360242029512491019:485234156704497676",":360578379155767307:485234118695583753",":ZSDrilJ:485230409852911626",":Warframelogo:485234582526885888",":hang:487701242051821588","👫"];
const commando = require('discord.js-commando')
const _ = require('lodash')
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 2;
let tempmute = require("./mute.json");

//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`React below to get the **"${role}"** role!`); //DONT CHANGE THIS
    return messages;
}





bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'welcome');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('#1fefb4')
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | name : ', member)
        .addField(':microphone2: | Welcome!', `Welcome to the server ${member}`)
        .addField(':id: | User :', `${member.id}`)
        .addField(':family_mwgb: | Your are the member', `${member.guild.memberCount}`)
        .addField("Name",`${member}`, true)
        .addField('Server', `${member.guild.name}`, true )
        .setFooter(`**${member.guild.name}**`)
        .setTimestamp()

        channel.send(embed);
});

  bot.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find('name', 'log');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('#0328bc')
        .setThumbnail(memberavatar)
        .addField('Name:', member)
        .addField('Has Left the Server', ';(')
        .addField('The server now has', `${member.guild.memberCount}` + " members")
        .setFooter(`**${member.guild.name}**`)
        .setTimestamp()

        channel.send(embed);
});


bot.on('voiceStateUpdate', (member) => {
  if(!member.hasPermission("CHANGE_NICKNAME")) member.addRole("518529874705514507")
})
bot.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);
                }
            });
        }
    }
})


bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){

        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);

        if (msg.author.id == bot.user.id && msg.content != initialMessage){

            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];

            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find('name', role);
                var memberObj = msg.guild.members.get(user.id);

                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })

    }
});


function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

bot.on("message", message => {
  const args = message.content.split(" ").slice(1);
 
  if (message.content.startsWith("eval")) {
    if(message.author.id !== "368716189083500554") return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

/*if (message.includes("")) {
  message.delete()
  messgae.author.send("Sorry, but the word is banned on this server!")
}*/

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity(`the Hentai channel (ツ)`, {type: "watching", url: "https://www.youtube.com/watch?v=NeQM1c-XCDc"});
  //bot.user.setActivity(`.help on ${bot.guilds.size} servers!`,{type: "listening"})

});


bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;


  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  /*let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#0000FF")
  .addField("💸", `${coinAmt} coins added!`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
*/}

  let xpAdd = Math.floor(Math.random() * 7) + 8;


  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 2000;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor(purple)
    .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });
  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("You have to wait 2 seconds between commands.")
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }


  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

});

var channelremember = {};

bot.on('voiceStateUpdate', (old, member) => {
  if (old.selfMute == false && member.selfMute == true && old.voiceChannelID != '443655055866986496'){
      //console.log("mute: false to true");
      member.setVoiceChannel(old.guild.afkChannel)
            .then(() => {
                //console.log(Moved ${member.displayName})
                channelremember[member.id] = old.voiceChannelID
                //console.log(channelremember)
            })
            .catch(console.error);
  }
  if (old.selfMute == true && member.selfMute == false && old.voiceChannelID != '443655055866986496'){
      //console.log("mute: true to false");
      member.setVoiceChannel(channelremember[member.id])
            .then(() => {
                //console.log(Moved ${member.displayName})
            })
            .catch(console.error);
  }
});

bot.on('message', (message) => {
  if (message.content === 'devstop') {
    const devembed = new Discord.RichEmbed()
    .setTitle("Reloaded the Bot👌")
    .setTimestamp()
    if (message.author.id !== '368716189083500554') return message.channel.send(`${message.author} Sorry Pal, i can't let you do this`) && message.delete(1500);
    message.delete()
    message.channel.send(devembed).then(() => {
    process.exit(1);
  })
}});

bot.on('message', (message) => {
  if(message.content.toLowerCase() == 'moin') {
  message.channel.send('moin moin')
  }
  if(message.content.toLowerCase() == 'arikel13'){
    message.channel.send('https://www.youtube.com/watch?v=05hzPFjL5Kw')
    message.channel.send("https://www.change.org/p/stoppt-die-zensurmaschine-rettet-das-internet-uploadfilter-artikel13-saveyourinternet")
    message.channel.send("https://www.youtube.com/intl/de/saveyourinternet/")
  }
  if(message.content.toLowerCase() == 'gn8'){
    message.channel.send('https://www.allmystery.de/i/t481498_IMG_1804.JPG')
  }
  if(message.content.toLowerCase() == 'wtf') {
    message.channel.send('https://media1.tenor.com/images/5c36b5497629f905d0c011d16f01c0ff/tenor.gif?itemid=10312546')
  }
  if(message.content.toLowerCase() == 'lol') {
    message.channel.send('https://tenor.com/view/girl-fight-oh-no-you-didnt-oh-no-you-didnt-mona-lisa-gif-5061993')
  }
    if(message.content.toLowerCase() == "film5") {
      let replies = ["Schau den ersten Film.","Schau den Dritten Film.","Schau den Zweiten Film.","Schau den Vierten Film.","Schau den Fünften Film."]
      message.delete();
      let result = Math.floor((Math.random() * replies.length));

      let film5embed = new Discord.RichEmbed()
      .setColor("#f46242")
      .addField("Answer", replies[result]);
      message.channel.send(film5embed);
    }
    if(message.content.toLowerCase() == "film4") {
      let replies = ["Schau den ersten Film.","Schau den Dritten Film.","Schau den Zweiten Film.","Schau den Vierten Film."]
      message.delete();
      let result = Math.floor((Math.random() * replies.length));

      let film4embed = new Discord.RichEmbed()
      .setColor("#f46242")
      .addField("Answer", replies[result]);
      message.channel.send(film4embed);
    }
    if(message.content.toLowerCase() == "film3") {
      let replies = ["Schau den ersten Film.","Schau den Dritten Film.","Schau den Zweiten Film."]
      message.delete();
      let result = Math.floor((Math.random() * replies.length));

      let film3embed = new Discord.RichEmbed()
      .setColor("#f46242")
      .addField("Answer", replies[result]);
      message.channel.send(film3embed);
    }
  if(message.content.toLowerCase() == "film2") {
    let replies = ["Schau den ersten Film.","Schau den Zweiten Film."]
    message.delete();
    let result = Math.floor((Math.random() * replies.length));

    let film2embed = new Discord.RichEmbed()
    .setColor("#f46242")
    .addField("Answer", replies[result]);
    message.channel.send(film2embed);
  
  }}
  );
  bot.login(tokenfile.token);
