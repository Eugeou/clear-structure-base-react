import { createContext, useMemo, useReducer } from "react";
import { initialState, mainReducer, type MainProviderTypes } from "./main-provider-types";
import type { UserInfo } from "../../types";
import { MainDefault } from "./main-init";
export const MainContext = createContext<MainProviderTypes>(MainDefault);
export const MainProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    const setUserInfo = (userInfo: UserInfo) => {
        dispatch({ type: "SET_USER_INFO", payload: userInfo });
    };

    const setIsLoading = (isLoading: boolean) => {
        dispatch({ type: "SET_IS_LOADING", payload: isLoading });
    };

    const contextValue = useMemo(() => ({
        ...state,
        setUserInfo,
        setIsLoading,
    }), [state, setUserInfo, setIsLoading]);

    return <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>;
};