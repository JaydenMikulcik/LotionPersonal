import React from "react";

import Mainpage from "./pages/mainpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />}></Route>
        <Route path="/notes/:id/*" element={<Mainpage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
