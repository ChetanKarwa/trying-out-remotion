import styled from "styled-components";

export const InputWrapperComponent = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;
  height: 100px;
  align-items: center;
  input:first-child {
    width: 100%;
  }
`;

export const InputCrossButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  button {
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const AddNewLeaderboard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-direction: column;
  color: #fff;
  height: 100%;
  cursor: pointer;
`;
