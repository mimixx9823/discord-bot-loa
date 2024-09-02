import { SlashCommand } from '../../types/slashCommand';

export const auctionCalc: SlashCommand = {
  name: "경매",
  description: "경매금액 손익분기 계산기",
  options: [
    {
      name: "인원",
      description: "N빵 인원",
      required: true,
      min_value: 1,
      type: 4,
    },
    {
      name: "금액",
      description: "아이템 경매장가",
      required: true,
      min_value: 1,
      type: 4,
    },
  ],
  execute: async (_, interaction) => {
    let count = (interaction.options.get("인원")?.value as number) ?? 1;
    let price = (interaction.options.get("금액")?.value as number) ?? 1;
    let endPoint = Math.floor((price * 0.95 * (count - 1)) / count); // 경매가 x 0.95 x n-1/n
    let more = Math.floor(endPoint / 1.1);

    await interaction.followUp({
      ephemeral: true,
      content: getResultText(endPoint, more),
    });
  },
};

function getResultText(...input: (string | number)[]): string {
  return (
    `> 마지노선 ${input[0]}G\n` +
    `> **입찰 추천 금액**:money_mouth:\n` +
    "> ```" +
    input[1] +
    "```"
  );
}
