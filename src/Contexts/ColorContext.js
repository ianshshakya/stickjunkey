

import React, { createContext } from "react";

// Create the Color Context
export const ColorContext = createContext({ color: "#f55bad", backgroundColor: "#040a08" });

const ColorProvider = ({ children }) => {
  const colorValue = {
    color: "#fff8f8ff",
    backgroundColor: "#FF758F"
  };

  return (
    <ColorContext.Provider value={colorValue}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorProvider;
