import { z } from "zod";
import { AbsoluteFill, Sequence } from "remotion";
import { CompositionProps } from "../../types/constants";
import { loadFont, fontFamily } from "@remotion/google-fonts/ChakraPetch";
import React from "react";

import Screen1 from "./Screen1";
import Screen2 from "./Screen2";

loadFont();

const container: React.CSSProperties = {
  backgroundColor: "white",
  fontFamily,
};

export const Main = ({ title }: z.infer<typeof CompositionProps>) => {
  const screen1Duration = 75;
  return (
    <AbsoluteFill style={container}>
      <Sequence durationInFrames={screen1Duration}>
        <Screen1 title={title} />
      </Sequence>
      <Sequence from={screen1Duration} durationInFrames={240}>
        <Screen2 />
      </Sequence>
    </AbsoluteFill>
  );
};
