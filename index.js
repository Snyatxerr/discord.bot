const { Client, GatewayIntentBits, Routes, SlashCommandBuilder, InteractionResponse, CommandInteraction, MessageReaction } = require('discord.js');
const config = require('./config.json');
const { REST } = require('@discordjs/rest');
const { get } = require('mongoose');

const rest = new REST({version:'10'}).setToken(config.token);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ,
GatewayIntentBits.GuildBans, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages,
 GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, 
  GatewayIntentBits.GuildWebhooks
 ] });

client.login(config.token);//C:\Users\user\Desktop\bot
client.once("ready", () => {
	console.log('Ready!'); // 起動した時に"Ready!"とコンソールに出力する
});

client.on("messageCreate", (message) =>{ 
    if(message.author.bot) return;
    console.log(message.createdAt.toLocaleString(),"サーバー名"+ message.guild.name , 'ユーザー名'+ message.author.tag  , message.content);
    if (message.content.includes(config.pochi))
    if(!message.content.includes(config.me)){
        console.log("削除されたメッセージ"+message.content);
        message.delete(2000);
    }
        if(message.content.includes(config.me)) {
            let random = Math.floor(Math.random()*1000);
            if(random <= 600)  
            message.channel.send(config.me1);//60%
            else if (random <= 994)   
            message.channel.send(config.me2);//39.4%
            else 
            message.channel.send(config.unusualstring);
        }
});

client.on("interactionCreate",(interaction) => {//スラッシュコマンドに
    if(interaction.isChatInputCommand()) {
        console.log('コマンド名'+interaction.commandName,'ユーザー名'+interaction.user.tag);
        if(interaction.commandName === 'ping'){
        let ping =Date.now() - interaction.createdTimestamp;
        console.log(ping);
        interaction.reply(String(ping)+'msです');
        }
        /*if(interaction.commandName === "checkstart"){
        if(client.message.content.includes(config.me1))
        client.delete(2000);}*/
        }
});

async function main() {
    const commands = [{
        name :'checkstart' ,
        description:'react to several words',
    } , {
        name : 'ping',
        description:'pong!',
    },  
];
    try {
        console.log('application command start ');
        Routes.applicationGuildCommands;
        await rest.put(Routes.applicationGuildCommands(config.clientId,config.guildId),{
            body : commands,
     });
    } catch (err) {
        console.log(err)
    }
};

main(); //関わる部分

client.on("guildMemberAdd", member => {
    console.log("サーバー名" +member.guild.name , `${member.user.tag}   came` ,   member.guild.id );//参加したユーザーの情報を出す
});
client.on("guildMemberRemove",member => {
    console.log( member.guild.name , `${member.user.username}   left` ,   member.guild.id );//退会したユーザーの情報を出す
});

client.on("channelPinsUpdate", (channel,date) => {//ピン止めしたメッセージ自体は表示されない
    console.log("ピン止めに変更");
});

client.on("messageReactionAdd",(reaction,user) => {
    if(reaction.message.author =='true')
    console.log(user.username+'のリアクションを削除');
    reaction.remove(2000);//課題　コンソールログが表示されない
});