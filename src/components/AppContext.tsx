import React, { useContext, useReducer, createContext } from 'react';
import { appReducer, AppState, Tab } from '../reducer';

const initialState: AppState = {
    currentTab: Tab.Label,
    model: false,
    report: undefined,
    dispatch: () => {}
};

const AppStateContext = createContext(initialState);
export const useAppState = () => useContext(AppStateContext);

export const AppProvider: React.FC = ({ children }) => {
    const [appState, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppStateContext.Provider value={{ ...appState, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}