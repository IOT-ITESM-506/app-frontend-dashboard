import { createContext, useEffect, useReducer, ReactNode, useState, useContext } from "react"
import { AppContextType, AppProviderProps } from "src/types/context"
import { IGreenhouse } from "src/types/Greenhouse";

import { AuthContext } from "src/contexts/AuthContext";

export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider(props: AppProviderProps){
    const { greenhouses } = useContext(AuthContext);

    const [selectedGreenhouse, setSelectedGreenhouse] = useState<IGreenhouse>(
        localStorage.getItem('selectedGreenhouse') ? JSON.parse(localStorage.getItem('selectedGreenhouse') as string) : greenhouses[0]
    );
    const onChangeSelectedGreenhouse = (greenhouse: IGreenhouse) => {
        setSelectedGreenhouse(greenhouse);
        localStorage.setItem('selectedGreenhouse', JSON.stringify(greenhouse));
    }

    const appContext: AppContextType = {
        selectedGreenhouse,
        onChangeSelectedGreenhouse
    }

    return (
        <AppContext.Provider value={appContext}>
            {props.children}
        </AppContext.Provider>
    )
}