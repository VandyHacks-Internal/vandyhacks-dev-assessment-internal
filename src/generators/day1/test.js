const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();

client.on('ready', async () => {
  console.log(`Bot has started`);
  const guild = await client.guilds.create('deleteMe', {});
  console.log('Successfully created guild', guild);
});

client.login(process.env.DISCORD_BOT_TOKEN);
// setTimeout(() => 100, 1000);
