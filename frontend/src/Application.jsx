import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  useEffect(() => {
    document.title = `${title} | React`;
  }, [title]);

  return (
    <AppContext.Provider value={{ navigate, setTitle }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
