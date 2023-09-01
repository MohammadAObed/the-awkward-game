import React, { createContext, useContext, useEffect, useState } from "react";
import useButtonAudio from "../../hooks/common/useButtonAudio";

const AppContext = createContext();
function AppContextProvider({ children }) {
  const { playSound: playBtnSound } = useButtonAudio();
  return <AppContext.Provider value={{ playBtnSound }}>{children}</AppContext.Provider>;
}

function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
}

function useAppContextWithEffect(callback, dependencies) {
  const context = useAppContext();
  useEffect(() => {
    callback(context);
  }, dependencies);
}

export { AppContextProvider, useAppContext };
