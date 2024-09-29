
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import OrdersProvider from "./context/orders-context.tsx";

const manifestUrl =
  "https://vocongbinh.github.io/food-delivery-TMA/tonconnect-manifest.json";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <OrdersProvider>
      <App />
    </OrdersProvider>
  </TonConnectUIProvider>


);
