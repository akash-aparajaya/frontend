import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/login";
import Dashboard from "../features/dashboard/dashboard";
import Register from "../features/register/register";
import Otp from "../features/otp/otp";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
             {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Other Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<Otp />} />

      </Routes>
    </BrowserRouter>
  );
}