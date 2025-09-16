import type { UserInfo } from "../../types";

export interface MainProviderTypes {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

type MainState = {
  userInfo: UserInfo;
  isLoading: boolean;
};

type MainAction = 
    | { type: "SET_USER_INFO", payload: UserInfo }
    | { type: "SET_IS_LOADING", payload: boolean };

export const mainReducer = (state: MainState, action: MainAction): MainState => {
    switch (action.type) {
        case "SET_USER_INFO":
            return { ...state, userInfo: action.payload };
        case "SET_IS_LOADING":
            return { ...state, isLoading: action.payload };
    }
};

export const initialState: MainState = {
    userInfo: {
        id: "",
        primary_domain: "",
        url: "",
        name: "",
        email: "",
        shop_owner_name: "",
        contact_email: "",
        session_token: "",
        is_new: false,
    },
    isLoading: false,
};