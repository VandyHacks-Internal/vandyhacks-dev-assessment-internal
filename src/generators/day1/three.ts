import fetch from 'node-fetch';
require('dotenv').config();

const token = process.env.DISCORD_BOT_TOKEN as string;
const api = process.env.DISCORD_API as string;
const endpointChannel = process.env.DISCORD_ENDPOINT_CHANNEL as string;
const category = process.env.DISCORD_CATEGORY as string;

async function makeChannel(user: string) {
  const channelBody = {
    name: user,
    parent_id: category,
  };

  const response = await fetch(api + endpointChannel, {
    method: 'post',
    body: JSON.stringify(channelBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${token}`,
    },
  });

  const json = await response.json();
  console.log(json);
  return json;
}

async function makeWebhook(user: string) {
  const channel = await makeChannel(user);
  const endpointWebhook = `channels/${channel.id}/webhooks`;
  const webhookBody = {
    name: `Day One ${user}`,
  };
  const response = await fetch(api + endpointWebhook, {
    method: 'post',
    body: JSON.stringify(webhookBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${token}`,
    },
  });
  const json = await response.json();
  console.log(json);
  return json;
}

export async function generate(user: string) {
  const webhook = await makeWebhook(user);
  return JSON.stringify(webhook);
}
