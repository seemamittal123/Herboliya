import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import {router} from "./routes";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>,
);
