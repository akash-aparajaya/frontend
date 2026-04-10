import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/login";
import Dashboard from "../features/dashboard/dashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
             {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Other Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}