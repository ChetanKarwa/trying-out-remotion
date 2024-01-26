import { makeTransform, translateY } from "@remotion/animation-utils";
import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import styled from "styled-components";
import { TokenProgressChartProps } from "../../types/constants";
import { z } from "zod";

const TOTAL_RANKS = 5;
const BAR_HEIGHT = 200;

type BarProps = {
  endWidth: number;
  color: string;
  symbol: string;
  rank: number;
  icon: string;
  totalRanks: number;
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
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const opacity = interpolate(
    frame - (TOTAL_RANKS - rank) * 3 - 10,
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
    [0, endWidth]
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
      {/* @ts-ignore */}
      <BarContainer
        style={{
          opacity,
          width: animatedWidth,
          marginLeft: left,
        }}
        color={color}
      />
      <div style={{ width: 120 }} />
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
          color: "white",
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

interface IScreen2 {
  tokenProgressChart: z.infer<typeof TokenProgressChartProps>;
}
function Screen2({ tokenProgressChart }: IScreen2) {
  const frame = useCurrentFrame();
  const { width, fps, height } = useVideoConfig();
  const ranking = tokenProgressChart.leaderboardEntries;

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

  const filteredRanking = useMemo(
    () =>
      ranking.filter((token) => token.color && token.iconUrl && token.symbol),
    [ranking]
  );

  const backgroundColor = interpolateColors(
    titleOpacity,
    [0, 1],
    ["white", "black"]
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: makeTransform([translateY(titlePosition)]),
          justifyContent: "center",
          gap: 20,
          backgroundColor,
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
          {tokenProgressChart.leaderboardTitle}
        </div>
        {filteredRanking.map((rank, i) => {
          return (
            <Bar
              color={rank.color}
              endWidth={width / 2 - 70 * (i + 1) - 40}
              rank={i + 1}
              symbol={rank.symbol}
              key={rank.color}
              icon={rank.iconUrl}
              totalRanks={filteredRanking.length}
            />
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

export default Screen2;
