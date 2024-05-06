'use client';
import {createContext, useContext, useState} from 'react';

const StateContext = createContext({
    activeMenu: true,
    setActiveMenu: (activeMenu: boolean) => {},
   
});



export const ContextProvider = ({children}: {children: React.ReactNode}) => {
    //The state for the menu section: SideBar
    //To be opened or closed. 
    //It changes according to the width of the screen in NavBar.jsx
    //And it is modified in Sidebar.jsx
    const [activeMenu, setActiveMenu] = useState(true);
    
    return (
        <StateContext.Provider 
        value={{
            activeMenu, 
            setActiveMenu,
            
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);