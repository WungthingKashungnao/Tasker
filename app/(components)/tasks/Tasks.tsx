"use client";
import styled from "styled-components";
import { useGlobalState } from "../(context)/globalProvider";
import CreateContent from "../modals/CreateContent";

const Tasks = () => {
  const { theme } = useGlobalState();
  return (
    <TaskStyled theme={theme}>
      <CreateContent />
    </TaskStyled>
  );
};

export default Tasks;
const TaskStyled = styled.main`
  padding: 2rem;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
`;
