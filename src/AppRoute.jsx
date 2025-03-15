import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
