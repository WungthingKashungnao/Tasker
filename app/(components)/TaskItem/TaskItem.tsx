import React from "react";
import { edit, trash } from "../utils/Icons";
interface Props {
  title: String;
  description: String;
  date: String;
  isCompleted: boolean;
  isImportant: boolean;
  _id: String;
}

const TaskItem = ({
  title,
  description,
  date,
  isCompleted,
  isImportant,
  _id,
}: Props) => {
  return (
    <div className="task">
      <h2>{title}</h2>
      <p>{description}</p>
      <p className="date">{date}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button className="completed">Completed</button>
        ) : (
          <button className="incomplete">Incomplete</button>
        )}
        <button className="edit">{edit}</button>
        <button className="delete">{trash}</button>
      </div>
      <p>{isCompleted}</p>
      <p>{isImportant}</p>
    </div>
  );
};

export default TaskItem;
