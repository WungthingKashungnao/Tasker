"use client";
import styled from "styled-components";
import { useGlobalState } from "../(context)/globalProvider";
import CreateContent from "../modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";

interface Props {
  title: string;
  tasks: any[];
}

const Tasks = ({ title, tasks }: Props) => {
  const { theme } = useGlobalState();
  return (
    <TaskStyled theme={theme}>
      {/* <CreateContent /> */}
      <h1>{title}</h1>
      <div className="tasks grid">
        {tasks?.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            isImportant={task.isImportant}
            _id={task._id}
          />
        ))}
      </div>
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
