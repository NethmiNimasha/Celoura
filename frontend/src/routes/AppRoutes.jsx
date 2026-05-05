import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Nabvar";
import Home from "../pages/Home";
import Login from "../pages/SignIn";
import Register from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;