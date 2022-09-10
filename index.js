const { Client, GatewayIntentBits } = require('discord.js');

const config = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ,
GatewayIntentBits.GuildBans] });

client.once('ready', () => {
	console.log('Ready!'); // 起動した時に"Ready!"とコンソールに出力する
});

client.on ("guildMemberAdd", member => {
    console.log("サーバー名" +member.guild.name , `${member.user.tag}   came` ,   member.guild.id );//参加したユーザーの情報を出す
});
client.on("guildMemberRemove",member => {
    console.log( member.guild.name , `${member.user.username}   left` ,   member.guild.id );//退会したユーザーの情報を出す
});

client.on("messageCreate", (message) =>{  //現在進行中
    if(message.author.bot) return;
    console.log("サーバー名"+ message.guild.name , "ユーザー名"+ message.author.tag  , message.content);//会話内容、話者、サーバー名を表示
  //if()  
});

client.login(config.token);//　　C:\Users\user\Desktop\bot