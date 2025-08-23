import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddCustomer from "./pages/AddCustomer";
import RemoveCustomer from "./pages/RemoveCustomer";
import ViewDues from "./pages/ViewDues";
import UpdateDues from "./pages/UpdateDues"
import Reminder from "./pages/Reminder";
import CustomerLogin from './pages/customerPages/CustomerLogin'
import CustomerRegister from './pages/customerPages/CustomerRegister'
import CustomerDashboard from './pages/customerPages/CustomerDashboard'
import ViewMyDues from './pages/customerPages/ViewMyDues'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/owner/login" element={<Login />} />
        <Route path="/owner/register" element={<Register />} />
        <Route path="/owner/dashboard" element={<Dashboard />} />
        <Route path="/owner/addCustomer" element={<AddCustomer />} />
        <Route path="/owner/removeCustomer" element={<RemoveCustomer />} />
        <Route path="/owner/viewDues" element={<ViewDues />} />
        <Route path="/owner/updateDues" element={<UpdateDues />} />
        <Route path="/owner/reminder" element={<Reminder />} />
        {/* customerPages */}
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/viewdues" element={<ViewMyDues />} />
      </Routes>
    </Router>
  );
};

export default App;
