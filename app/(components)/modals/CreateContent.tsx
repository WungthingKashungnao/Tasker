"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

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

      toast.success("Task created succesfully!");
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="input-control">
        <label>Toggle Completed</label>
        <input
          type="checkbox"
          value={completed.toString()}
          name="completed"
          onChange={handleChange("completed")}
          id="completed"
        />
      </div>
      <div className="input-control">
        <label>Toggle Important</label>
        <input
          type="checkbox"
          value={important.toString()}
          name="important"
          onChange={handleChange("important")}
          id="important"
        />
      </div>

      <div className="submit-btn">
        <button type="submit">
          <span>submit</span>
        </button>
      </div>
    </form>
  );
};

export default CreateContent;
