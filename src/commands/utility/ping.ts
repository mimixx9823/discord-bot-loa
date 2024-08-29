import { SlashCommandBuilder } from 'discord.js';

import { SlashCommand } from '../../types/slashCommand';

export const ping: SlashCommand = {
  name: "ping",
  description: "ping pong!",
  execute: async (_, interaction) => {
    await interaction.followUp({
      ephemeral: true,
      content: "pong!!!",
    });
  },
};
