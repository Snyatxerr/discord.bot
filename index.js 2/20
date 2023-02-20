const http = require('http');
http.createServer(function(request, response)
{response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Bot is online!');
}).listen(30000);
talk = require("./send.js");
response = require("./response.js");
const { Client, GatewayIntentBits,Routes,EmbedBuilder,MessageReaction,REST} = require('discord.js');
const rest = new REST({ version: '10' }).setToken(process.env.token);
const cron = require('node-cron');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent , GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages,
 GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessageReactions,GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, 
  GatewayIntentBits.GuildWebhooks
 ] });
client.login(process.env.token);
const { EnkaClient } = require("enka-network-api");
const enka = new EnkaClient({ showFetchCacheLog:true ,defaultLanguage:'jp'}); 

client.once("ready", () => {
	console.log('Ready!'); 
});
/*client.on("ready",async()=>{
  const channel = await client.channels.fetch("1076085414462488606");
  cron.schedule('* * * * *',()=>{
    channel.send("/status uid:831174687")
})
});*/


/*talk(client);
response(client);*/
let pictures="";
client.on("ready", async () => {
  const data = [
    {   name: "status",
        description: "キャラのステータスを取得します",
        
        options: [
            {
                type:3,
                name: "uid",
                description: "キャラのステータスを取得します",
           required: true,
              min_length:9,
              max_length:9
            }]
    },
];
await client.application.commands.set(data,"958936100561367090");
});
let characters="";
let pyro="";
let electro="";
let hydro="";
let dendro="";
let anemo="";
let cryo="";
let geo="";

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
      return;
  }
  if (interaction.commandName === "status") {
  const uid = interaction.options._hoistedOptions[0].value;
    console.log(uid);
    interaction.deferReply;
await enka.fetchUser(uid).then(user =>{
for(i=0;i<user.charactersPreview.length;i++){
characters += user.charactersPreview[i].characterData._nameId;
if(user.characters[i]._data.fightPropMap["1000"]===undefined){
 ;
}else{
  pyro += user.characters[i]._data.fightPropMap["1000"]+","
}
if(user.characters[i]._data.fightPropMap["1001"]===undefined){
 ;
}else{
  electro += user.characters[i]._data.fightPropMap["1001"]+","
}
if(user.characters[i]._data.fightPropMap["1002"]===undefined){
 ;
}else{
  hydro += user.characters[i]._data.fightPropMap["1002"]+","
}
 if(user.characters[i]._data.fightPropMap["1003"]===undefined){
 ;
}else{
  dendro += user.characters[i]._data.fightPropMap["1003"]+","
}
   if(user.characters[i]._data.fightPropMap["1004"]===undefined){
 ;
}else{
  anemo += user.characters[i]._data.fightPropMap["1004"]+","
}
if(user.characters[i]._data.fightPropMap["1005"]===undefined){
 ;
}else{
  cryo += user.characters[i]._data.fightPropMap["1005"]+","
}
 if(user.characters[i]._data.fightPropMap["1006"]===undefined){
 ;
}else{
  geo += user.characters[i]._data.fightPropMap["1006"]+","
} 
}
  if(pyro==""){
    pyro="null"
  }else{
  pyro=pyro.slice(0,-1);
  }
  if(electro==""){
   electro="null"
  }else{
  electro=electro.slice(0,-1);
  }
  if(hydro==""){
    hydro="null"
  }else{
  hydro=hydro.slice(0,-1);
  }
 if(dendro==""){
    dendro="null"
  }else{
  dendro=dendro.slice(0,-1);
  } 
  if(anemo==""){
    anemo="null"
  }else{
  anemo=anemo.slice(0,-1);
  }  
  if(anemo==""){
    cryo="null"
  }else{
  cryo=cryo.slice(0,-1);
  } 
   if(anemo==""){
    geo="null"
  }else{
  geo=geo.slice(0,-1);
  } 
if(user.profilePictureCharacter.costumes[0].isDefault){pictures=user.profilePictureCharacter.splashImage.url;
}else{
pictures=user.profilePictureCharacter.costumes[0].splashImage.url;
}
const embed = new EmbedBuilder()
.setTitle(user.profilePictureCharacter._nameId)
.setURL(("https://enka.network/u/"+uid+"/"))
.setImage(pictures)
.setFields({name:user.nickname,value:"世界ランク"+user._data.playerInfo.worldLevel+"螺旋"+user._data.playerInfo.towerFloorIndex+"-"+user._data.playerInfo.towerLevelIndex})
.addFields({name:"ステータスメッセージ",value:user.signature,inline:true})
.addFields({name:"キャラター",value:characters,inline:true})
.addFields({name:"炎元素",value:pyro})
.addFields({name:"雷元素",value:electro})
.addFields({name:"水元素",value:hydro})
.addFields({name:"草元素",value:dendro})
.addFields({name:"風元素",value:anemo})
interaction.reply({embeds:[embed]});
  pictures="";
  characters="";
  pyro="";
  electro="";
  hydro="";
  dendro="";
  anemo="";
  cryo="";
  geo="";
})
}
});
