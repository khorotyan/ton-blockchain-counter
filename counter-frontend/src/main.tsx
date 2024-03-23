import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestUrl =
  "https://gist.githubusercontent.com/vahagn-plutotv/bce94e0689448a579ae1ba300c7854b5/raw/804f7747900ee4a9b3a0d032b3afd4ebefbdc3e0/tonconnect-manifest.json";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>
);
