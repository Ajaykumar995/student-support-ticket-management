import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import CreateTicket from "./pages/CreateTicket";
import StaffDashboard from "./pages/StaffDashboard";
import TicketDetails from "./pages/TicketDetails";
import ManagerDashboard from "./pages/ManagerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute
              allowedRoles={[
                "STUDENT",
              ]}
            >
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-ticket"
          element={
            <ProtectedRoute
              allowedRoles={[
                "STUDENT",
              ]}
            >
              <CreateTicket />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff"
          element={
            <ProtectedRoute
              allowedRoles={[
                "STAFF",
                "MANAGER",
              ]}
            >
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets/:id"
          element={
            <ProtectedRoute>
              <TicketDetails />
            </ProtectedRoute>
          }
        />
        <Route
  path="/manager"
  element={
    <ProtectedRoute
      allowedRoles={[
        "MANAGER",
      ]}
    >
      <ManagerDashboard />
    </ProtectedRoute>
  }
/>

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;