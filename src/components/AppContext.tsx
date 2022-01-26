import React, { useContext, useReducer, createContext } from 'react';
import { appReducer, AppState, Tab } from '../reducer';

const initialState: AppState = {
    isSupported: !!window.showDirectoryPicker,
    currentTab: Tab.Label,
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