export interface PaymentProviderTypes {
  id: string;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  url: string;
  setUrl: (url: string) => void;
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
}