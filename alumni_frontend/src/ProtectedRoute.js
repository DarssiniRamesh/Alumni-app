import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

// PUBLIC_INTERFACE
export default function ProtectedRoute({ children }) {
  /**
   * Protects routes behind authentication.
   * If the user is not authenticated and auth state is loaded, redirects to /login.
   * Preserves the original requested path in state for post-login redirect.
   */
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
