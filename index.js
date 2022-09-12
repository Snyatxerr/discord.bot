const { Client, GatewayIntentBits, Routes } = require('discord.js');

const config = require('./config.json');

const { REST } = require('@discordjs/rest');

const rest = new REST({version:'10'}).setToken(config.token);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ,
GatewayIntentBits.GuildBans] });

client.login(config.token);//　　C:\Users\user\Desktop\bot

client.once("ready", () => {
	console.log('Ready!'); // 起動した時に"Ready!"とコンソールに出力する
});

client.on ("guildMemberAdd", member => {
    console.log("サーバー名" +member.guild.name , `${member.user.tag}   came` ,   member.guild.id );//参加したユーザーの情報を出す
});
client.on("guildMemberRemove",member => {
    console.log( member.guild.name , `${member.user.username}   left` ,   member.guild.id );//退会したユーザーの情報を出す
});

client.on("messageCreate", (message) =>{  //一旦放置
    if(message.author.bot) return;
    console.log("サーバー名"+ message.guild.name , 'ユーザー名'+ message.author.tag  , message.content);
    //if(message.content.includes(""))
    if(message.content.includes(config.mmm)){
        let random = Math.floor(Math.random()*100);
        if(random <= 80)
        message.channel.send(config.mmm1); //将来性あり  80％
        else message.channel.send(config.mmm2); //20％
    }
    else if(message.content.includes(config.me)){
        let random = Math.floor(Math.random()*1000);
        if(random <= 600)  
        message.channel.send(config.me1);//60%
        else if (random <= 994)   
        message.channel.send(config.me2);//39.4%
        else 
        message.channel.send(config.unusualstring);
    }
});

//(async () => {
  //  try{
   //     console.log("start");
   //     const data = await rest.put(Routes.applicationGuildCommands(config.clientId,config.guildId),
        //{body : commands},
   //     );
   //     console.log('clear!');
   //     }
   //     catch(error){
   //         console.log(error);
   // }
//})();

