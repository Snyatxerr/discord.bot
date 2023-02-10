
const http = require('http');
http.createServer(function(request, response)
{response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Bot is online!');
}).listen(3000);
//test = require("./command.js");
talk = require("./send.js");
response = require("./response.js");
//respond = require("./respond.js");
const { Client, GatewayIntentBits,Routes, InteractionResponse,ReplyOptions,CommandInteraction, MessageReaction,REST,ApplicationCommands } = require('discord.js');
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
client.on("ready",async()=>{
  const channel = await client.channels.fetch("1022696342000250923");
  cron.schedule('0 * * * *',()=>{
    channel.send("にゃ");
  })
});
//test(client);
talk(client);
response(client);


/*const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
];

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands("1009785374245134456"), { body: commands });
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});*/

let Chpart=[];
let Ch="";

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
    if(uid.startsWith("0")) return;
    else{
await enka.fetchUser(uid).then(user =>{ if(!user.charactersPreview){
    interaction.reply("null");
}else{
for(i=0;i<user.charactersPreview.length;i++){
Chpart[i]=(user.charactersPreview[i].characterData._nameId);
  Ch += Chpart[i]+",";
  Ch.slice(0,-1);
}
interaction.reply(Ch);       
Ch = "";
}
 })
}
  }
});
