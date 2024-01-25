import { HexColorPicker } from "react-colorful";
import React, { useRef, useState } from "react";
import {
  ColorInputComponent,
  ColorInputWrapper,
  ColorInputWrapperComponent,
} from "./index.styles";
import useClickAway from "../../hooks/useClickAway";

export const ColorInput: React.FC<{
  color: string;
  setColor: (newColor: string) => void;
  disabled?: boolean;
}> = ({ color, setColor, disabled }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => {
    setOpen(false);
  });

  return (
    <ColorInputWrapperComponent>
      <ColorInputWrapper
        color={color}
        onClick={() => {
          if (!disabled) {
            setOpen(!open);
          }
        }}
      ></ColorInputWrapper>
      {open && (
        <ColorInputComponent ref={ref}>
          <HexColorPicker color={color} onChange={setColor} />
        </ColorInputComponent>
      )}
    </ColorInputWrapperComponent>
  );
};
