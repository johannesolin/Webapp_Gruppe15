import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Workfinder from "./pages/Workfinder";
import Stilling from "./pages/Stilling";
import Agiver from "./pages/Agiver";
import Ataker from "./pages/Ataker";
import DatabaseTest from "./pages/DatabaseTest";
import Settings from "./pages/Profil";

function isLoggedIn() {
  const user = localStorage.getItem("workf_bruker");
  return user !== null;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return isLoggedIn() ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  console.log("Hei!");

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stilling" element={<Stilling />} />
        <Route path="/agiver" element={<Agiver />} />
        <Route path="/ataker" element={<Ataker />} />
        
        <Route
          path="/workfinder"
          element={
            <ProtectedRoute>
              <Workfinder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/database"
          element={
            <ProtectedRoute>
              <DatabaseTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}