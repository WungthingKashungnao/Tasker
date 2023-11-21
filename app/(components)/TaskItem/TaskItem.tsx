import React from "react";
import { edit, trash } from "../utils/Icons";
import styled from "styled-components";
import { useGlobalState } from "../(context)/globalProvider";
import formatDate from "../../(components)/utils/formatDate";

interface Props {
  title: String;
  description: String;
  date: String;
  isCompleted: boolean;
  isImportant: boolean;
  id: String;
}

const TaskItem = ({
  title,
  description,
  date,
  isCompleted,
  isImportant,
  id,
}: Props) => {
  const { theme, deleteTask } = useGlobalState();

  return (
    <TaskItemStyled theme={theme} className="task">
      <div className="task-details">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {/* --------- */}
      <div className="task-details ">
        <div>
          <p className="date">{formatDate(date)}</p>
        </div>
        <div className="taskUpdate">
          <div className="task-footer">
            {isCompleted ? (
              <button className="completed">Completed</button>
            ) : (
              <button className="incomplete">Incomplete</button>
            )}
          </div>
          <button className="edit">{edit}</button>
          <button className="delete ml-2" onClick={() => deleteTask(id)}>
            {trash}
          </button>
          {/* <p>{isCompleted}</p>
          <p>{isImportant}</p> */}
        </div>
      </div>
    </TaskItemStyled>
  );
};

export default TaskItem;
const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  height: 16rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  .task-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .task-footer {
      flex: 2;
      .completed,
      .incomplete {
        display: inline-block;
        padding: 0.4rem 1rem;
        background: ${(props) => props.theme.colorDanger};
        border-radius: 30px;
      }
      .completed {
        background: ${(props) => props.theme.colorGreenDark};
      }
    }
    .taskUpdate {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`;
