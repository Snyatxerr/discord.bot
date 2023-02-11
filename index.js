const http = require('http');
http.createServer(function(request, response)
{response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Bot is online!');
}).listen(3000);
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
client.on("ready",async()=>{
  const channel = await client.channels.fetch("1022696342000250923");
  cron.schedule('0 * * * *',()=>{
    channel.send("にゃ");
  })
});
talk(client);
response(client);
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
await client.application.commands.set(data,"1022696341530492999");
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
      return;
  }
  if (interaction.commandName === "status") {
  const uid = interaction.options._hoistedOptions[0].value;
    console.log(uid);
    interaction.deferReply
await enka.fetchUser(uid).then(user =>{
  if(user.profilePictureCharacter.costumes[0].isDefault){pictures=user.profilePictureCharacter.splashImage.url;
}else{
pictures=user.profilePictureCharacter.costumes[0].splashImage.url;
}
const embed = new EmbedBuilder()
.setTitle(user.profilePictureCharacter._nameId)
.setURL(("https://enka.network/u/"+uid+"/"))
.setImage(pictures)
.addFields({name:user.nickname,value:"世界ランク"+user._data.playerInfo.worldLevel+"螺旋"+user._data.playerInfo.towerFloorIndex+"-"+user._data.playerInfo.towerLevelIndex})
.addFields({name:"ステータスメッセージ",value:user.signature,inline:true})
  interaction.reply({embeds:[embed]});
  pictures="";
})
}
});
