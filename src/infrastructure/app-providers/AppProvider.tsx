import { MainProvider } from "@/domain/context/main/main-provider";
import MasterLayout from "@/infrastructure/app-layout/MasterLayout";
import { QueryProvider } from "@/infrastructure/app-providers/3rd-providers/QueryProvider";
import i18n from "@/locales";
import Routers from "@/routes/Routers";
import { Provider as JotaiProvider } from "jotai";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // dev only
import { PaymentProvider } from "../../domain/context/payment/payment-provider";

// const billingUrl = env.api.billing;
// const appId = env.app.id;

const App: React.FC = () => {
  return (
    <>
      <QueryProvider>
        <JotaiProvider>
          <BrowserRouter>
            <I18nextProvider i18n={i18n}>
              <MainProvider>
                <PaymentProvider>
                  <MasterLayout>
                    <Routers />
                  </MasterLayout>
                </PaymentProvider>
              </MainProvider>
            </I18nextProvider>
          </BrowserRouter>
        </JotaiProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>
    </>
  );
};
export default App;
