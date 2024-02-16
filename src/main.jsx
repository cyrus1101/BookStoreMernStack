import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./Context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SnackbarProvider>
  </BrowserRouter>
);
