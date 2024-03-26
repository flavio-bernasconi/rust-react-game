import React from "react";
import "./App.css";
import App from "./App";
import init from "rust-component";

import { createRoot } from "react-dom/client";

init().then(() => {
  const container = document.getElementById("root");
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
