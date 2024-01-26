import { z } from "zod";
import { useRendering } from "../helpers/use-rendering";
import { COMP_NAME } from "../types/constants";
import { AlignEnd } from "./AlignEnd";
import { Button } from "./Button/Button";
import { InputContainer } from "./Container";
import { DownloadButton } from "./DownloadButton";
import { ErrorComp } from "./Error";
import { Input } from "./Input";
import { ProgressBar } from "./ProgressBar";
import { Spacing } from "./Spacing";
import { ColorInput } from "./ColorInput";
import { TokenProgressChartProps } from "../types/constants";
import { NumberInput } from "./NumberInput";
import { InputWrapperComponent } from "./index.styles";

export const RenderControls: React.FC<{
  tokenProgressChart: z.infer<typeof TokenProgressChartProps>;
  setTokenProgressChart: React.Dispatch<
    React.SetStateAction<z.infer<typeof TokenProgressChartProps>>
  >;
  inputProps: z.infer<typeof TokenProgressChartProps>;
}> = ({ tokenProgressChart, setTokenProgressChart, inputProps }) => {
  const { renderMedia, state, undo } = useRendering(COMP_NAME, inputProps);

  return (
    <InputContainer>
      {state.status === "init" ||
      state.status === "invoking" ||
      state.status === "error" ? (
        <>
          {/* <NumberInput number={}/> */}
          <NumberInput
            disabled={state.status === "invoking"}
            number={tokenProgressChart.counterNumber}
            setNumber={(newCount) => {
              setTokenProgressChart({
                ...tokenProgressChart,
                counterNumber: newCount,
              });
            }}
          ></NumberInput>
          <Spacing></Spacing>
          <Input
            disabled={state.status === "invoking"}
            text={tokenProgressChart.counterTitle}
            placeholder="Counter title"
            setText={(newText) => {
              setTokenProgressChart({
                ...tokenProgressChart,
                counterTitle: newText,
              });
            }}
          ></Input>
          <Spacing></Spacing>
          <Input
            placeholder="Leaderboard title"
            disabled={state.status === "invoking"}
            text={tokenProgressChart.leaderboardTitle}
            setText={(newText) => {
              setTokenProgressChart({
                ...tokenProgressChart,
                leaderboardTitle: newText,
              });
            }}
          ></Input>
          <Spacing></Spacing>
          {tokenProgressChart.leaderboardEntries.map((token, index) => (
            <InputWrapperComponent key={index}>
              <Input
                disabled={state.status === "invoking"}
                text={token.iconUrl}
                placeholder="Icon URL"
                setText={(newText) => {
                  setTokenProgressChart({
                    ...tokenProgressChart,
                    leaderboardEntries: [
                      ...tokenProgressChart.leaderboardEntries.slice(0, index),
                      {
                        ...token,
                        iconUrl: newText,
                      },
                      ...tokenProgressChart.leaderboardEntries.slice(index + 1),
                    ],
                  });
                }}
              ></Input>
              <Input
                disabled={state.status === "invoking"}
                text={token.symbol}
                placeholder="Symbol"
                setText={(newText) => {
                  setTokenProgressChart({
                    ...tokenProgressChart,
                    leaderboardEntries: [
                      ...tokenProgressChart.leaderboardEntries.slice(0, index),
                      {
                        ...token,
                        symbol: newText,
                      },
                      ...tokenProgressChart.leaderboardEntries.slice(index + 1),
                    ],
                  });
                }}
              ></Input>

              <ColorInput
                color={token.color}
                setColor={(newColor) => {
                  setTokenProgressChart({
                    ...tokenProgressChart,
                    leaderboardEntries: [
                      ...tokenProgressChart.leaderboardEntries.slice(0, index),
                      {
                        ...token,
                        color: newColor,
                      },
                      ...tokenProgressChart.leaderboardEntries.slice(index + 1),
                    ],
                  });
                }}
              ></ColorInput>
            </InputWrapperComponent>
          ))}
          {/* <ColorInput color={color} setColor={setColor} /> */}
          <Spacing></Spacing>
          <AlignEnd>
            <Button
              disabled={state.status === "invoking"}
              loading={state.status === "invoking"}
              onClick={renderMedia}
            >
              Render video
            </Button>
          </AlignEnd>
          {state.status === "error" ? (
            <ErrorComp message={state.error.message}></ErrorComp>
          ) : null}
        </>
      ) : null}
      {state.status === "rendering" || state.status === "done" ? (
        <>
          <ProgressBar
            progress={state.status === "rendering" ? state.progress : 1}
          />
          <Spacing></Spacing>
          <AlignEnd>
            <DownloadButton undo={undo} state={state}></DownloadButton>
          </AlignEnd>
        </>
      ) : null}
    </InputContainer>
  );
};
