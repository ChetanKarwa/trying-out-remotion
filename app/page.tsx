"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useState } from "react";
import { Main } from "../remotion/MyComp/Main";
import {
  TokenProgressChartProps,
  defaultTokenProgressChart,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { z } from "zod";
import { RenderControls } from "../components/RenderControls";

const container: React.CSSProperties = {
  marginBottom: 20,
  display: "flex",
  gap: 20,
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};

const outer: React.CSSProperties = {
  borderRadius: "var(--geist-border-radius)",
  overflow: "hidden",
  boxShadow: "0 0 200px rgba(0, 0, 0, 0.15)",
  width: 300,
};

const player: React.CSSProperties = {
  width: "100%",
};

const Home: NextPage = () => {
  const [tokenProgressChart, setTokenProgressChart] = useState(
    defaultTokenProgressChart
  );

  const inputProps: z.infer<typeof TokenProgressChartProps> = useMemo(() => {
    return tokenProgressChart;
  }, [tokenProgressChart]);

  return (
    <div>
      <div style={container}>
        <div className="cinematics" style={outer}>
          <Player
            component={Main}
            inputProps={inputProps}
            durationInFrames={
              inputProps.durationOfEachSegment * inputProps.screens.length
            }
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={player}
            controls
            autoPlay
            loop
          />
        </div>
        <RenderControls
          tokenProgressChart={tokenProgressChart}
          setTokenProgressChart={setTokenProgressChart}
          inputProps={inputProps}
        ></RenderControls>
      </div>
    </div>
  );
};

export default Home;
