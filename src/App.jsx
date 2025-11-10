import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Workfinder from "./pages/Workfinder.jsx";
import Stilling from "./pages/Stilling.jsx";
import Agiver from "./pages/Agiver.jsx";
import Ataker from "./pages/Ataker.jsx";
import DatabaseTest from "./pages/DatabaseTest.jsx";

export default function App() {
  console.log("Hei!");

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stilling" element={<Stilling />} />
        <Route path="/Agiver" element={<Agiver />} />
        <Route path="/Ataker" element={<Ataker />} />
        <Route path="/workfinder" element={<Workfinder />} />
        <Route path="/database" element={<DatabaseTest />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
