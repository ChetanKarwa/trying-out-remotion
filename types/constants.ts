import { z } from "zod";
export const COMP_NAME = "MyComp";

export const ScreenDataProps = z.object({
  counterTitle: z.string(),
  counterNumber: z.number().int().min(1),
  leaderboardTitle: z.string(),
  leaderboardEntries: z.array(
    z.object({
      symbol: z.string(),
      color: z.string(),
      iconUrl: z.string().url(),
    })
  ),
});

export const TokenProgressChartProps = z.object({
  durationOfEachSegment: z.number().int().min(1),
  screens: z.array(ScreenDataProps),
});

export const defaultTokenProgressChart: z.infer<
  typeof TokenProgressChartProps
> = {
  durationOfEachSegment: 300,
  screens: [
    {
      counterTitle: "NFT Transfers",
      counterNumber: 1700,
      leaderboardTitle: "Most NFT Transfers",
      leaderboardEntries: [
        {
          color: "#b2fef5",
          iconUrl:
            "https://s2.coinmarketcap.com/static/img/coins/128x128/1.png",
          symbol: "BTC",
        },
        {
          color: "#d5f772",
          iconUrl:
            "https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png",
          symbol: "ETH",
        },
        {
          color: "#f7f772",
          iconUrl:
            "https://s2.coinmarketcap.com/static/img/coins/128x128/825.png",
          symbol: "USDT",
        },
        {
          color: "#4e00f9",
          iconUrl:
            "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
          symbol: "BNB",
        },
        {
          color: "#0e0e0e",
          iconUrl:
            "https://s2.coinmarketcap.com/static/img/coins/128x128/5426.png",
          symbol: "SOL",
        },
      ],
    },
  ],
};

export const DURATION_IN_FRAMES = 300;
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;
