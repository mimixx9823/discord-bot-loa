import 'dotenv/config';

import { Client, GatewayIntentBits, Interaction } from 'discord.js';

import commands from './commands/commands';
import { auctionCalc } from './commands/utility/auctionMoneyCalc';
import { ping } from './commands/utility/ping';

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const commandList = commands;
const startBot = async () => {
  await client.login(process.env.DISCORD_TOKEN);
  console.info("info: login success!");
  client.on("ready", async () => {
    if (client.application) {
      await client.application.commands.set(commandList);
      console.log("info: command registering");
      commandList.map((d) => console.log("[command] " + d.name));
      console.log("info: command registered");
    }
  });

  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand()) {
      //등록한 명령어를 찾아서
      const currentCommand = commandList.find(
        ({ name }) => name === interaction.commandName
      );

      if (currentCommand) {
        await interaction.deferReply();
        //실행해준다.
        currentCommand.execute(client, interaction);
        console.log(`info: command ${currentCommand.name} handled correctly`);
      }
    }
  });
};

startBot();
