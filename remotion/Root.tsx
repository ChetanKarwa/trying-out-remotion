import { CalculateMetadataFunction, Composition } from "remotion";
import { Main } from "./MyComp/Main";
import {
  COMP_NAME,
  defaultTokenProgressChart,
  TokenProgressChartProps,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { z } from "zod";

const calculateMetadata: CalculateMetadataFunction<
  z.infer<typeof TokenProgressChartProps>
> = ({ props }) => {
  const totalDuration = props.durationOfEachSegment * props.screens.length;
  return {
    // Change the metadata
    durationInFrames: totalDuration,
    // or transform some props
    props,
    // or add per-composition default codec
    defaultCodec: "h264",
  };
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id={COMP_NAME}
      component={Main}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
      defaultProps={defaultTokenProgressChart}
      calculateMetadata={calculateMetadata}
    />
  );
};
