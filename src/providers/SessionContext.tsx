import React, { createContext, useState } from 'react';

export const SessionContext = createContext({
  activeSessionCount: 0,
  increaseSessionCount: () => {},
  decreaseSessionCount: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const SessionProvider: React.FC<Props> = ({ children }) => {
  const [activeSessionCount, setActiveSessionCount] = useState(0);

  const increaseSessionCount = () => {
    setActiveSessionCount(prevCount => prevCount + 1);
  };

  const decreaseSessionCount = () => {
    setActiveSessionCount(prevCount => prevCount - 1);
  };

  return (
    <SessionContext.Provider value={{
      activeSessionCount,
      increaseSessionCount,
      decreaseSessionCount,
    }}
    >
      {children}
    </SessionContext.Provider>
  );
};
