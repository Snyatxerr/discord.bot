const http = require('http');
http.createServer(function(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Bot is online!');
}).listen(30000);
const { Client, GatewayIntentBits, Routes, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageReaction, REST, StringSelectMenuInteraction, StringSelectMenuBuilder } = require('discord.js');
const rest = new REST({ version: '10' }).setToken(process.env.token);
const cron = require('node-cron');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages,
  GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildWebhooks
  ]
});
client.login(process.env.token);
const { EnkaClient } = require("enka-network-api");
const enka = new EnkaClient({ showFetchCacheLog: true, defaultLanguage: 'jp' });

client.once("ready", () => {
  console.log('Ready!');
});


client.on("ready", async () => {
  const data = [
    {
      name: "status",
      description: "キャラのステータスを取得します",

      options: [
        {
          type: 3,
          name: "uid",
          description: "キャラのステータスを取得します",
          required: true,
          min_length: 9,
          max_length: 9
        }]
    },
  ];
  await client.application.commands.set(data, "958936100561367090");
});











let User ="";
let pictures = "";
let characters = "";
let characterArray = [];
let LocalcharacterArray = {};
let control = [];

let characterId = "";


client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  if (interaction.commandName === "status") {
    uid = interaction.options._hoistedOptions[0].value;
    console.log(uid);
    interaction.deferReply();
    await enka.fetchUser(uid).then(user => {
      User = user
    })
      for (i = 0; i < User.charactersPreview.length; i++) {
        characters += User.charactersPreview[i].characterData._nameId;
      if (User.profilePictureCharacter.costumes[0].isDefault) {
        pictures = User.profilePictureCharacter.splashImage.url;
      } else {
        pictures = User.profilePictureCharacter.costumes[0].splashImage.url;
      }
        LocalcharacterArray[User.charactersPreview[i].characterData._nameId] = User.characters[i].characterData.id;
        characterArray[i] = User.charactersPreview[i].characterData._nameId;
control[User.charactersPreview[i].characterData._nameId]= i;
      }
      const row = new ActionRowBuilder()
        .addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('Genshin')
            .setPlaceholder('キャラクターを選択')
            .addOptions(
              (characterArray.map(c => ({
                value: c,
                label: c
              }))
              )
            ),
        );

      const embed = new EmbedBuilder()
        .setTitle(User.profilePictureCharacter._nameId)
        .setURL(("https://enka.network/u/" + uid + "/"))
        .setImage(pictures)
        .setFields({ name: User.nickname, value: "世界ランク " + User._data.playerInfo.worldLevel + " 螺旋 " + User._data.playerInfo.towerFloorIndex + "-" + User._data.playerInfo.towerLevelIndex })
        .addFields({ name: "ステータスメッセージ", value: User.signature, inline: true })
        .addFields({ name: "キャラター", value: characters, inline: false })
       
      interaction.editReply({ embeds: [embed],components: [row], });
      pictures = "";
      characters = "";
  }
});































client.on("interactionCreate",async (interaction) => {
  if(!interaction.isStringSelectMenu()) return;
  if (interaction.customId == "Genshin")
  
characterId = LocalcharacterArray[interaction.values[0].toString()];

controlId = control[interaction.values[0].toString()]

console.log(controlId)
enka.fetchUser(uid).then(user => {
      User = user
    })
  

let info = enka.getCharacterById(characterId);
  
//  console.log(User.characters)
const em = new EmbedBuilder()
        .setTitle(interaction.values[0])
.addFields({ name: "元素", value: "null" })
       
       interaction.update({ embeds:[em],components:[] });

  
  
characterArray = [];
      LocalcharacterArray = {};
})
