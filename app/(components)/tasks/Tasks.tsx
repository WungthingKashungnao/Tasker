"use client";
import styled from "styled-components";
import { useGlobalState } from "../(context)/globalProvider";
import CreateContent from "../modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import { plus } from "../utils/Icons";

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

        <button className="create-task">
          {plus}
          Add New Task
        </button>
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
  .tasks {
    margin: 3rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;
    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;
