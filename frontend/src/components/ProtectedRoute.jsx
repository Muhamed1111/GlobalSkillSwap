import React from "react";
import { Navigate } from "react-router-dom";

// Zaštićena ruta: ako korisnik nije logovan, preusmjeri ga na /appwrite/login
const ProtectedRoute = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem("user");

  if (!isAuthenticated) {
    return <Navigate to="/appwrite/login" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
