import { makeTransform, scale, translateY } from "@remotion/animation-utils";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontFamily } from "@remotion/google-fonts/ChakraPetch";
import { PullIn } from "../Effects/PullIn";
function Screen1({ count }: { count: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const counterTextSize = interpolate(frame, [40, 45], [60, 30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textScale = spring({
    fps,
    frame,
    config: {
      damping: 12,
    },
  });

  const counter = Math.floor(
    interpolate(frame, [0, 30], [0, count], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const counterPosition = interpolate(frame, [40, 45], [0, -100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nftTextOpacity = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 10,
    delay: 45,
  });

  const counterTextStyle: React.CSSProperties = {
    transform: makeTransform([
      scale(textScale * 2),
      translateY(counterPosition),
    ]),
    fontSize: counterTextSize,
    fontFamily,
    letterSpacing: 10,
  };

  const titleTextStyle: React.CSSProperties = {
    fontFamily,
    opacity: nftTextOpacity,
    position: "absolute",
  };

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={counterTextStyle}>{counter}</div>
      <div style={titleTextStyle}>
        <PullIn
          text="NFT Transfers"
          fontFamily={fontFamily}
          fontSize={120}
          color="black"
        />
      </div>
    </AbsoluteFill>
  );
}

export default Screen1;
