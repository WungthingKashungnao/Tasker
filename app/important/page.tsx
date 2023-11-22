"use client";
import React from "react";
import { useGlobalState } from "../(components)/(context)/globalProvider";
import Tasks from "../(components)/tasks/Tasks";

const page = () => {
  const { importantTasks } = useGlobalState();
  return <Tasks title="Important Tasks" tasks={importantTasks} />;
};

export default page;
