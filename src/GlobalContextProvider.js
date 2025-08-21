import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

function GlobalContextProvider({children}) {
  const name = localStorage.getItem("userName");
  const [userName, setUserName] = useState(name);
  // console.log(userName);
  return (
    <GlobalContext value={{ userName, setUserName }}>{children}</GlobalContext>
  );
}

export default GlobalContextProvider;
