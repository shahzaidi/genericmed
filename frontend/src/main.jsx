import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";
import TheContext from "./contextApi/TheContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <Provider store={store}>
    <TheContext>
      <App />
    </TheContext>
  </Provider>
  // </React.StrictMode>
);
