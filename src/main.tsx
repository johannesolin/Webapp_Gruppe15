import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // denne kan senere endres til "./App" når App.tsx er klar

const rootEl = document.getElementById("root");

console.log("main.tsx: root =", rootEl);

if (!rootEl) {
  throw new Error("Root element with id 'root' not found");
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
