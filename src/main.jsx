import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./home/app";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/layout";
import "./index.css";
import Canvas from "./canvas/canvas";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/room/:id/:cursor" element={<Canvas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

