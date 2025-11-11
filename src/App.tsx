import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Workfinder from "./pages/Workfinder";
import Stilling from "./pages/Stilling";
import Agiver from "./pages/Agiver";
import Ataker from "./pages/Ataker";
import DatabaseTest from "./pages/DatabaseTest";

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
        <Route path="/ataker" element={<Ataker />} />
        <Route path="/database" element={<DatabaseTest />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
