"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGlobalState } from "../(context)/globalProvider";
import styled from "styled-components";
import Button from "../button/Button";
import { plus } from "../utils/Icons";

const CreateContent = () => {
  const { allTasks } = useGlobalState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const { theme, closeModal } = useGlobalState();

  // function to handle changes of the sates
  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };
  // function to handle submit form
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // making an object of all the states
    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      allTasks(); //realoading all the tasks again after adding a new task
      closeModal(); //closing the modal after succesfully creating the task
      toast.success("Task created succesfully!");
      // console.log(res);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <FormContent onSubmit={handleSubmit} theme={theme}>
      <h1>Create Task</h1>
      <div className="input-control">
        <label>Title</label>
        <input
          type="text"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="Enter the title"
          id="title"
        />
      </div>
      <div className="input-control">
        <label>Description</label>
        <textarea
          value={description}
          name="description"
          rows={4}
          onChange={handleChange("description")}
          placeholder="Enter the description"
          id="description"
        />
      </div>
      <div className="input-control">
        <label>Date</label>
        <input
          type="date"
          value={date}
          name="date"
          onChange={handleChange("date")}
          id="date"
        />
      </div>
      <div className="input-control toggler">
        <label>Toggle Completed</label>
        <input
          type="checkbox"
          value={completed.toString()}
          name="completed"
          onChange={handleChange("completed")}
          id="completed"
        />
      </div>
      <div className="input-control toggler">
        <label>Toggle Important</label>
        <input
          type="checkbox"
          value={important.toString()}
          name="important"
          onChange={handleChange("important")}
          id="important"
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Create Task"
          icon={plus}
          padding="0.8rem 2rem"
          borderRad="0.8rem"
          fw="500"
          fs="1.2rem"
          background={theme.colorGreenDark}
          color={theme.colorGrey1}
        />
        {/* <button type="submit">
          <span>submit</span>
        </button> */}
      </div>
    </FormContent>
  );
};

export default CreateContent;
const FormContent = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }
  padding: 1rem;

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    label {
      margin-bottom: 0.9;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);
      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      border: none;
      outline: none;
      padding: 1rem;
      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 1rem;
    }
  }
  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;
    label {
      flex: 1;
    }
    input {
      width: initial;
    }
  }
`;
