import type { UserInfo } from "../../../types/user";

export const AuthMockData = {
    data_getter : () => {
        return {
            userInfo: {
                id: "test",
                primary_domain: "test",
                url: "test",
                name: "test",
                email: "test",
                shop_owner_name: "test",
                contact_email: "test",
                session_token: "test",
                is_new: false,
            },
        };
    },
    data_setter : (userInfo: UserInfo | null) => {
        return {
            userInfo: userInfo,
        };
    },
    data_remover : () => {
        return {
            userInfo: null,
        };
    },
    data_clearer : () => {
        return {
            userInfo: null,
        };
    },
    data_logout : () => {
        return {
            userInfo: null,
        };
    },
};