import { createContext } from "react";
import { type PaymentProviderTypes } from "./payment-provider-types";
import { PaymentDefault } from "./payment-provider-init";

export const PaymentContext = createContext<PaymentProviderTypes>(PaymentDefault);

export const PaymentProvider = ({ children }: { children: React.ReactNode }) => {
  return <PaymentContext.Provider value={PaymentDefault}>{children}</PaymentContext.Provider>;
};