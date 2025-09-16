/**
 * GA events
 */
import type { EventParams } from "@/infrastructure/plugins/google-analytic/ga-client";
import { trackEvent } from "@/infrastructure/plugins/google-analytic/ga-client";

export const GA_EVENTS = {
    LOGIN: "login",
    LOGOUT: "logout",
    CREATE_USER: "create_user",
    UPDATE_USER: "update_user",
};

export const GA_EVENTS_ACTION = {
    LOGIN: "login",
    LOGOUT: "logout",
    CREATE_USER: "create_user",
    UPDATE_USER: "update_user",
};

export const GA_EVENTS_CATEGORY = {
    AUTH: "auth",
};

const trackUserHasLoggedIn = (userId: string) => {
    trackEvent(GA_EVENTS_CATEGORY.AUTH, GA_EVENTS.LOGIN, {
        user_id: userId,
    });
};

const trackUserHasLoggedOut = (userId: string) => {
    trackEvent(GA_EVENTS_CATEGORY.AUTH, GA_EVENTS.LOGOUT, {
        user_id: userId,
    });
};

const trackUserHasCreatedUser = (userId: string) => {
    trackEvent(GA_EVENTS_CATEGORY.AUTH, GA_EVENTS.CREATE_USER, {
        user_id: userId,
    });
};

const trackUserHasUpdatedUser = (userId: string) => {
    trackEvent(GA_EVENTS_CATEGORY.AUTH, GA_EVENTS.UPDATE_USER, {
        user_id: userId,
    });
};

export const useAnalyticsEvents = {
    trackUserHasLoggedIn,
    trackUserHasLoggedOut,
    trackUserHasCreatedUser,
    trackUserHasUpdatedUser,
};