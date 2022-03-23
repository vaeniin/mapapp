import React, { createContext, useContext, useState } from 'react';

const SwipeableContext = createContext();

export const useSwipeable = () => useContext(SwipeableContext);

export const SwipeableProvider = ({ children }) => {
    const [openedItem, setOpenedItem] = useState();

    const value = {
        openedItem,
        setOpenedItem,
    };

    return (
        <SwipeableContext.Provider value={value}>
            {children}
        </SwipeableContext.Provider>
    );
};