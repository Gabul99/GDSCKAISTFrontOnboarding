import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { MainLayout, RootLayout } from "./layout/index";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/main" element={<MainLayout />} />
    </Route>
  )
);

export default router;
