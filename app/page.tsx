"use client";
import Tasks from "./(components)/tasks/Tasks";
import { useGlobalState } from "./(components)/(context)/globalProvider";

export default function Home() {
  const { tasks } = useGlobalState();

  return (
    <>
      <Tasks tasks={tasks} title="All Tasks" />
    </>
  );
}
