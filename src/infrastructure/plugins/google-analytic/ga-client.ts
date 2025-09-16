import { logger } from "@/infrastructure/logger/default-logger";

interface WindowWithGtag extends Window {
  gtag: (...args: any[]) => void;
}

export type EventParams = {
  [key: string]: string | number | boolean | undefined | object | any[];
  page_path?: string;
};

export interface BaseUserProperties {
  user_id?: string | null | undefined;
  email?: string | null | undefined;
}

export interface InitParams {
  app_id: string;
  shopify_id: string;
  user_id?: string | null;
}

interface TrackerState {
  app_id: string | null;
  shopify_id: string | null;
  user_id: string | null;
  user_properties: BaseUserProperties;
}

const state: TrackerState = {
  app_id: null,
  shopify_id: null,
  user_id: null,
  user_properties: {},
};

export function initTracker(params: InitParams): void {
  state.app_id = params.app_id;
  state.shopify_id = params.shopify_id;
  state.user_id = params.user_id || null;
  state.user_properties = params.user_id ? { user_id: params.user_id } : {};

  if (isBrowser() && params.user_id) {
    setUserInfo(params.user_id, state.user_properties);
  }
}

export function trackEvent(
  prefix: string,
  suffix: string,
  params: EventParams = {}
): void {
  if (!state.app_id) {
    logger.warn("GA SDK: Must call initTracker() first");
    return;
  }

  if (!isBrowser()) {
    return;
  }

  const parts = [prefix, state.app_id, suffix].filter(Boolean);
  const eventName = parts.join("_");
  trackEventInner(eventName, params);
}

function trackEventInner(eventName: string, params: EventParams = {}): void {
  const eventParams: EventParams = {
    ...params,
  };
  logger.debug("trackEventInner", eventName, eventParams);
  (window as unknown as WindowWithGtag).gtag("event", eventName, eventParams);
}

export function trackUserInfo(
  userId: string | null,
  properties: BaseUserProperties = {}
): void {
  if (!isBrowser()) {
    return;
  }

  state.user_id = userId;
  state.user_properties = userId
    ? { ...state.user_properties, ...properties }
    : {};

  if (userId) {
    (window as unknown as WindowWithGtag).gtag("set", "user_id", userId);
  } else {
    (window as unknown as WindowWithGtag).gtag("set", "user_id", null);
  }

  if (Object.keys(properties).length > 0 && userId) {
    (window as unknown as WindowWithGtag).gtag(
      "set",
      "user_properties",
      properties
    );
  }
}

function isBrowser(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof (window as unknown as WindowWithGtag).gtag === "function"
  );
}

function setUserInfo(userId: string, properties: BaseUserProperties): void {
  (window as unknown as WindowWithGtag).gtag("set", "user_id", userId);
  if (Object.keys(properties).length > 0) {
    (window as unknown as WindowWithGtag).gtag(
      "set",
      "user_properties",
      properties
    );
  }
}
