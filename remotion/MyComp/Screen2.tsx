import { makeTransform, scale, translateY } from "@remotion/animation-utils";
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import styled from "styled-components";

const TOTAL_RANKS = 5;
const BAR_HEIGHT = 200;

type BarProps = {
  endWidth: number;
  color: string;
  symbol: string;
  rank: number;
  icon: string;
  totalRanks?: number;
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  font-size: 28px;
  font-family: --Arial, Helvetica, sans-serif;
  font-weight: bold;
  line-height: 1.4;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
`;

export const BarContainer = styled.div<BarProps>`
  height: ${BAR_HEIGHT}px;
  background-color: ${(props) => props.color};
  margin-top: 10px;
  position: relative;
  transform: translateX(${BAR_HEIGHT / 2}px);
  &::after {
    content: "";
    position: absolute;
    width: ${BAR_HEIGHT / Math.SQRT2}px;
    height: ${BAR_HEIGHT / Math.SQRT2}px;
    background-color: ${(props) => props.color};
    /* border-radius: ${BAR_HEIGHT / 10}px; */
    transform: rotate(45deg);
    top: ${BAR_HEIGHT / 2 - BAR_HEIGHT / 1.414 / 2}px;
    right: -${BAR_HEIGHT / (2 * Math.SQRT2)}px;
  }
  &::before {
    content: "";
    position: absolute;
    width: ${BAR_HEIGHT / 1.414}px;
    height: ${BAR_HEIGHT / 1.414}px;
    background-color: ${(props) => props.color};
    /* border-radius: ${BAR_HEIGHT / 10}px; */
    transform: rotate(45deg);
    top: ${BAR_HEIGHT / 2 - BAR_HEIGHT / 1.414 / 2}px;
    left: -${BAR_HEIGHT / (2 * Math.SQRT2)}px;
  }
`;

export const Bar: React.FC<BarProps> = ({
  endWidth,
  color,
  symbol,
  rank,
  icon,
  totalRanks = TOTAL_RANKS,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const opacity = interpolate(
    frame - (totalRanks - rank) * 3 - 10,
    [0, 12],
    [0, 1]
  );
  const animatedWidthProgress = spring({
    frame: frame - 60 - rank * 3,
    fps,
    config: {
      damping: 200,
    },
  });
  const animatedWidth = interpolate(
    animatedWidthProgress,
    [0, 1],
    [0, endWidth + 100]
  );
  const left = interpolate(
    animatedWidthProgress,
    [0, 1],
    [width / 2 - BAR_HEIGHT / 2, -100]
  );
  const labelProgress = spring({
    frame: frame - 90 - rank * 20,
    fps,
    config: {
      damping: 200,
      mass: 0.6,
    },
  });
  return (
    <Row style={{ width: 2000 }}>
      <BarContainer
        style={{
          opacity,
          width: animatedWidth,
          marginLeft: left,
        }}
        color={color}
      />
      <div style={{ width: 40 }} />
      <div
        style={{
          opacity: labelProgress,
          transform: `translate(${BAR_HEIGHT / 2}px,${interpolate(
            labelProgress,
            [0, 1],
            [40, 0]
          )}px)`,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          fontSize: 40,
          color: "black",
          fontWeight: "400",
          letterSpacing: 2,
        }}
      >
        <Img
          src={icon}
          style={{ width: 100, height: 100, marginRight: 10, borderRadius: 50 }}
          alt={symbol}
        />
        {symbol}
      </div>
    </Row>
  );
};

const TITLE_OFFSET = 150;
const FONT_SIZE = 80;

function Screen2() {
  const frame = useCurrentFrame();
  const { width, fps, height } = useVideoConfig();
  const ranking = [
    {
      color: "#b2fef5",
      iconUrl: "https://s2.coinmarketcap.com/static/img/coins/128x128/1.png",
      symbol: "BTC",
    },
    {
      color: "#d5f772",
      iconUrl: "https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png",
      symbol: "ETH",
    },
    {
      color: "#f7f772",
      iconUrl: "https://s2.coinmarketcap.com/static/img/coins/128x128/825.png",
      symbol: "USDT",
    },
    {
      color: "#4e00f9",
      iconUrl: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
      symbol: "BNB",
    },
    {
      color: "#0e0e0e",
      iconUrl: "https://s2.coinmarketcap.com/static/img/coins/128x128/5426.png",
      symbol: "SOL",
    },
  ];

  const titleOpacity = spring({
    frame,
    fps,
    durationInFrames: 20,
  });

  const moveUp = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });

  const titlePosition = interpolate(
    moveUp,
    [0, 1],
    [height / 2 - TITLE_OFFSET - FONT_SIZE, 0]
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: makeTransform([translateY(titlePosition)]),
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            fontSize: 80,
            textAlign: "center",
            marginBottom: 80,
          }}
        >
          Most transferred tokens
        </div>
        {ranking.map((rank, i) => {
          return (
            <Bar
              color={rank.color}
              endWidth={width / 2 - 80 * i}
              rank={i + 1}
              symbol={rank.symbol}
              key={rank.color}
              icon={rank.iconUrl}
              totalRanks={ranking.length}
            />
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

export default Screen2;
