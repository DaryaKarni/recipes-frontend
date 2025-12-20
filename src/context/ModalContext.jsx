import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export const ModalProvider = ({children}) => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const openSignIn = () => setIsSignInOpen(true);
  const closeSignIn = () => setIsSignInOpen(false);

  return(
    <ModalContext.Provider value = {{isSignInOpen, openSignIn, closeSignIn}}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);