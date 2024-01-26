import React, { useCallback } from "react";

const textarea: React.CSSProperties = {
  resize: "none",
  lineHeight: 1.7,
  display: "block",
  borderRadius: "var(--geist-border-radius)",
  backgroundColor: "var(--background)",
  padding: "var(--geist-half-pad)",
  color: "var(--foreground)",
  fontSize: 14,
};

export const Input: React.FC<{
  text: string;
  setText: (newText: string) => void;
  disabled?: boolean;
  placeholder: string;
}> = ({ text, setText, disabled, placeholder }) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setText(e.currentTarget.value);
    },
    [setText]
  );

  return (
    <input
      disabled={disabled}
      placeholder={placeholder}
      name="title"
      style={textarea}
      value={text}
      onChange={onChange}
    />
  );
};
