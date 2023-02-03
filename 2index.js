
const http = require('http');
http.createServer(function(request, response)
{response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Bot is online!');
}).listen(3000);
const { Client, GatewayIntentBits,Routes, InteractionResponse,ReplyOptions,CommandInteraction, MessageReaction } = require('discord.js');
const cron = require('node-cron');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent , GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages,
 GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessageReactions,GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, 
  GatewayIntentBits.GuildWebhooks
 ] });
client.login(process.env.token);
console.log("aaa");
client.once("ready", () => {
	console.log('Ready!'); 
});
client.on("ready",async()=>{
  const channel = await client.channels.fetch("1022696342000250923");
  cron.schedule('0 * * * *',()=>{
    channel.send("にゃ");
  })
});
client.on("channelPinsUpdate",(channel,date)=>{
channel.send("うにゃああああああ！");
});
let cut,id;
let sentence="";
let letter = "";
client.on("messageCreate",(message)=>{
  if(message.author.bot) return;
  
  cut = message.content.split("");
  if(cut[0]=="毛"&&cut[1]=="玉"&&cut[2]=="「"&&cut[cut.length-1]=="」"){
    cut.splice(0,3);
    cut.splice(cut.length-1,1);
    for(let i=0;i<cut.length;i++){
      letter += cut[i];
      sentence=letter.replace(/\s+/g,'');
    }
      if(sentence==""){
        message.reply(message.author.id);
      }else if(message.type==0){
    message.delete(1);
    message.channel.send(sentence);
    letter="";
    sentence="";
      }else if(message.type==19){
        message.delete(1);
          
          message.channel.cache.message.reference.messageId.reply(sentence);
        letter="";
        sentence="";
      }
    else {return;
      }
  }
});
          
