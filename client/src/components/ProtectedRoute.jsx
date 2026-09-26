import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const ProtectedRoute = ({
  children,
  allowedRoles,
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    if (user.role === "STUDENT") {
      return <Navigate to="/student" replace />;
    }

    return <Navigate to="/staff" replace />;
  }

  return children;
};

export default ProtectedRoute;