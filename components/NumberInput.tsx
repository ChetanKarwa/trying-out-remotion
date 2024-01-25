import React, { useCallback } from "react";

const textarea: React.CSSProperties = {
  resize: "none",
  lineHeight: 1.7,
  display: "block",
  width: "100%",
  borderRadius: "var(--geist-border-radius)",
  backgroundColor: "var(--background)",
  padding: "var(--geist-half-pad)",
  color: "var(--foreground)",
  fontSize: 14,
};

export const NumberInput: React.FC<{
  number: number;
  setNumber: (newNumber: number) => void;
  disabled?: boolean;
}> = ({ number, setNumber, disabled }) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setNumber(parseInt(e.currentTarget.value));
    },
    [setNumber]
  );

  return (
    <input
      type="number"
      disabled={disabled}
      placeholder="Count"
      name="title"
      style={textarea}
      value={number}
      onChange={onChange}
    />
  );
};
