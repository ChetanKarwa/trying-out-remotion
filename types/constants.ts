import { z } from "zod";
export const COMP_NAME = "MyComp";

export const TokenProgressChartProps = z.object({
  count: z.number().int().min(1),
  token: z.array(
    z.object({
      symbol: z.string(),
      color: z.string(),
      imageURL: z.string().url(),
    })
  ),
  duration: z.number().int().min(1),
});

export const defaultTokenProgressChart: z.infer<
  typeof TokenProgressChartProps
> = {
  count: 1700,
  token: [
    {
      color: "#b2fef5",
      imageURL: "https://s2.coinmarketcap.com/static/img/coins/128x128/1.png",
      symbol: "BTC",
    },
    {
      color: "#d5f772",
      imageURL:
        "https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png",
      symbol: "ETH",
    },
    {
      color: "#f7f772",
      imageURL: "https://s2.coinmarketcap.com/static/img/coins/128x128/825.png",
      symbol: "USDT",
    },
    {
      color: "#4e00f9",
      imageURL:
        "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
      symbol: "BNB",
    },
    {
      color: "#0e0e0e",
      imageURL:
        "https://s2.coinmarketcap.com/static/img/coins/128x128/5426.png",
      symbol: "SOL",
    },
  ],
  duration: 800,
};

export const DURATION_IN_FRAMES = 300;
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;
