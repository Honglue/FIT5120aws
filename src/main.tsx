import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
// import { Amplify } from "aws-amplify";
// import outputs from "../amplify_outputs.json";
import './i18n';

// Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
