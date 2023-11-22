"use client";
import { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes"; //array of themes
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

// this is the context api file
export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0); //since theme is an array we give the first item initially
  const theme = themes[selectedTheme]; //selecting the theme from the array
  const [loading, setIsloading] = useState(false);
  const [tasks, setTasks] = useState([]); //state to handle tasks coming from api
  const { user } = useUser();

  // function to fetch all tasks from the api
  const allTasks = async () => {
    setIsloading(true);
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
      setIsloading(false);
      // console.log(res.data);
    } catch (error) {
      console.log("fetching data error", error);
      toast.error("Fetching data error!");
    }
  };

  // function to call api to delete task
  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      allTasks();
      toast.success("Task Deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // function to fetch completed tasks
  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  // function to fetch incomplete tasks
  const inCompleteTasks = tasks.filter((task) => task.isCompleted === false);

  // function to fetch important tasks
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  useEffect(() => {
    if (user) {
      allTasks();
    }
  }, [user]);
  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        loading,
        allTasks,
        completedTasks,
        inCompleteTasks,
        importantTasks,
      }}
    >
      <GlobalUpdateContext.Provider value={setSelectedTheme}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext); //to get state
export const useGlobalUpdate = () => useContext(GlobalUpdateContext); //to update the state
