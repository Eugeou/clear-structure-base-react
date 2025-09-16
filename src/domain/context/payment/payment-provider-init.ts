import type { PaymentProviderTypes } from "./payment-provider-types";

export const PaymentDefault : PaymentProviderTypes = {
    id: "",
    username: "",
    password: "",
    url: "",
    paymentMethod: "",
    setUsername: () => {},
    setPassword: () => {},
    setUrl: () => {},
    setPaymentMethod: () => {},
};