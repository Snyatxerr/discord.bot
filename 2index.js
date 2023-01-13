const token = process.env['token'];
const http = require('http');
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Bot is online!');
}).listen(3000);

const { Client, GatewayIntentBits,Routes, InteractionResponse, CommandInteraction, MessageReaction } = require('discord.js');
const { REST } = require('@discordjs/rest');
const cron = require('node-cron');
const rest = new REST({version:'10'}).setToken(process.env.token);
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ,
GatewayIntentBits.GuildBans, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages,
 GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, 
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
client.on("messageCreate",(message)=>{
  if(message.author.bot) return;
  limitrand = Math.round(Math.random()*15)+1;
  if(limitrand==1){
    message.reply("ぅゅ");
  }
    else return;
});
client.on("messageCreate",(message)=>{
  if(message.author.id=="990939880865558568"){
  message.reply.react("105580711305990152");
}
});
client.on("channelPinsUpdate",(channel,date)=>{
channel.send("うにゃああああああ！");
});
