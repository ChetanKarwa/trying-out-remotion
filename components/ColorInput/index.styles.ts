import styled from "styled-components";

export const ColorInputWrapper = styled.div`
  min-width: 40px;
  min-height: 40px;
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 8px;
  background-color: ${(props) => props.color && props.color};
  box-sizing: border-box;
  margin: 8px;
`;

export const ColorInputWrapperComponent = styled.div`
  position: relative;
`;
export const ColorInputComponent = styled.div`
  position: absolute;
  bottom: 150px;
  left: 100px;
  width: 100%;
  height: 100%;
  z-index: 1;
  // please center this component
  transform: translateX(-50%);
`;
