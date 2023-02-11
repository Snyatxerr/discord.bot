const http = require('http');
http.createServer(function(request, response)
{response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Bot is online!');
}).listen(3000);
const { Client, GatewayIntentBits,Routes, InteractionResponse,ReplyOptions,CommandInteraction,REST,ApplicationCommands , EmbedBuilder}= require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.token);
const cron = require('node-cron');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent , GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages,
 GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessageReactions,GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, 
  GatewayIntentBits.GuildWebhooks
 ] });
client.login(process.env.token);
const { EnkaClient } = require("enka-network-api");
const enka = new EnkaClient({ showFetchCacheLog:true ,defaultLanguage:'jp'}); 

console.log("aaa");
client.once("ready", () => {
	console.log('Ready!'); 
});

const data = new Map();

client.on("ready", async () => {
  const data = [
    {
        name: "status",
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
console.log(interaction.options._hoistedOptions[0].value);
  const uid = interaction.options._hoistedOptions[0].value;
    /*if(uid.startsWith("0")) {
      interaction.reply("null");
    }
    else{*/
await enka.fetchUser(uid).then(user =>{ /*if(!user.charactersPreview){
  console.log("case1");
    interaction.reply("null");
}else{*/

const embed = new EmbedBuilder()
  .setTitle("test")
  .setURL("https://enka.network/u/"+uid
+"/")
  .setFields({name:'はにゃ？',value:user.signature})
  interaction.reply({embeds:[embed]});
})
  }
});
