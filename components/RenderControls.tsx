import { z } from "zod";
import { useRendering } from "../helpers/use-rendering";
import { COMP_NAME, defaultTokenProgressChart } from "../types/constants";
import { AlignEnd } from "./AlignEnd";
import cloneDeep from "clone-deep";
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
import {
  AddNewLeaderboard,
  InputCrossButtonWrapper,
  InputWrapperComponent,
} from "./index.styles";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export const RenderControls: React.FC<{
  tokenProgressChart: z.infer<typeof TokenProgressChartProps>;
  setTokenProgressChart: React.Dispatch<
    React.SetStateAction<z.infer<typeof TokenProgressChartProps>>
  >;
  inputProps: z.infer<typeof TokenProgressChartProps>;
}> = ({ tokenProgressChart, setTokenProgressChart, inputProps }) => {
  const { renderMedia, state, undo } = useRendering(COMP_NAME, inputProps);

  return (
    <div style={{ maxWidth: "800px" }}>
      <Carousel showStatus={false}>
        {
          tokenProgressChart.screens.map((chart, index) => (
            <div key={index}>
              <InputContainer>
                {state.status === "init" ||
                state.status === "invoking" ||
                state.status === "error" ? (
                  <>
                    <InputCrossButtonWrapper>
                      <NumberInput
                        disabled={state.status === "invoking"}
                        number={chart.counterNumber}
                        setNumber={(newCount) => {
                          chart.counterNumber = newCount;
                          setTokenProgressChart({
                            ...tokenProgressChart,
                            screens: [...tokenProgressChart.screens],
                          });
                        }}
                      ></NumberInput>
                      {tokenProgressChart.screens.length > 1 && (
                        <Button
                          onClick={() => {
                            setTokenProgressChart((prevState) => ({
                              ...prevState,
                              screens: prevState.screens.filter(
                                (_, i) => i !== index
                              ),
                            }));
                          }}
                        >
                          X
                        </Button>
                      )}
                    </InputCrossButtonWrapper>
                    <Spacing></Spacing>
                    <Input
                      disabled={state.status === "invoking"}
                      text={chart.counterTitle}
                      placeholder="Counter title"
                      setText={(newText) => {
                        chart.counterTitle = newText;
                        setTokenProgressChart({
                          ...tokenProgressChart,
                          screens: [...tokenProgressChart.screens],
                        });
                      }}
                    ></Input>
                    <Spacing></Spacing>
                    <Input
                      placeholder="Leaderboard title"
                      disabled={state.status === "invoking"}
                      text={chart.leaderboardTitle}
                      setText={(newText) => {
                        chart.leaderboardTitle = newText;
                        setTokenProgressChart(tokenProgressChart);
                      }}
                    ></Input>
                    <Spacing></Spacing>
                    {chart.leaderboardEntries.map((token, index) => (
                      <InputWrapperComponent key={index}>
                        <Input
                          disabled={state.status === "invoking"}
                          text={token.iconUrl}
                          placeholder="Icon URL"
                          setText={(newText) => {
                            chart.leaderboardEntries[index].iconUrl = newText;
                            setTokenProgressChart({
                              ...tokenProgressChart,
                              screens: [...tokenProgressChart.screens],
                            });
                          }}
                        ></Input>
                        <Input
                          disabled={state.status === "invoking"}
                          text={token.symbol}
                          placeholder="Symbol"
                          setText={(newText) => {
                            chart.leaderboardEntries[index].symbol = newText;
                            setTokenProgressChart({
                              ...tokenProgressChart,
                              screens: [...tokenProgressChart.screens],
                            });
                          }}
                        ></Input>
                        <ColorInput
                          color={token.color}
                          setColor={(newColor) => {
                            chart.leaderboardEntries[index].color = newColor;
                            setTokenProgressChart({
                              ...tokenProgressChart,
                              screens: [...tokenProgressChart.screens],
                            });
                          }}
                        ></ColorInput>
                      </InputWrapperComponent>
                    ))}
                    <Spacing></Spacing>
                  </>
                ) : null}
                {state.status === "rendering" || state.status === "done" ? (
                  <>
                    <ProgressBar
                      progress={
                        state.status === "rendering" ? state.progress : 1
                      }
                    />
                    <Spacing></Spacing>
                    <AlignEnd>
                      <DownloadButton
                        undo={undo}
                        state={state}
                      ></DownloadButton>
                    </AlignEnd>
                  </>
                ) : null}
              </InputContainer>
            </div>
          )) as any
        }
        <InputContainer>
          <AddNewLeaderboard
            onClick={() => {
              setTokenProgressChart({
                ...tokenProgressChart,
                screens: [
                  ...tokenProgressChart.screens,
                  cloneDeep(defaultTokenProgressChart.screens[0]),
                ],
              });
            }}
          >
            Click to add a new leaderboard
          </AddNewLeaderboard>
        </InputContainer>
      </Carousel>
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
    </div>
  );
};
