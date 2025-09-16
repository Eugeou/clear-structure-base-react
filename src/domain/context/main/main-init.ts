import type { MainProviderTypes } from "./main-provider-types";

export const MainDefault : MainProviderTypes = {
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
  setIsLoading: () => {},
  setUserInfo: () => {},
};
