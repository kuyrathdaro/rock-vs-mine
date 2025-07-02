import React, { createContext, useContext, useState } from "react";

type ExplosionContextType = {
  explode: boolean;
  setExplode: (value: boolean) => void;
};

const ExplosionContext = createContext<ExplosionContextType | undefined>(undefined);

export const useExplosion = () => {
  const ctx = useContext(ExplosionContext);
  if (!ctx) throw new Error("useExplosion must be used within ExplosionProvider");
  return ctx;
};

export const ExplosionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [explode, setExplode] = useState(false);
  return (
    <ExplosionContext.Provider value={{ explode, setExplode }}>
      {children}
    </ExplosionContext.Provider>
  );
};