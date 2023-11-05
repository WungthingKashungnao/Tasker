"use client";
import { createContext, useState, useContext } from "react";
import themes from "./themes"; //array of themes

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

// this is the context api file
export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0); //since theme is an array we give the first item initially
  const theme = themes[selectedTheme]; //selecting the theme from the array
  return (
    <GlobalContext.Provider value={{ theme }}>
      <GlobalUpdateContext.Provider value={setSelectedTheme}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext); //to get state
export const useGlobalUpdate = () => useContext(GlobalUpdateContext); //to update the state
