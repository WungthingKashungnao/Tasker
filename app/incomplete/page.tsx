"use client";
import { useGlobalState } from "../(components)/(context)/globalProvider";
import Tasks from "../(components)/tasks/Tasks";

const page = () => {
  const { inCompleteTasks } = useGlobalState();
  return <Tasks title="Incomplete Tasks" tasks={inCompleteTasks} />;
};

export default page;
