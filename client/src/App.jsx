import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddCustomer from "./pages/AddCustomer";
import RemoveCustomer from "./pages/RemoveCustomer";
import ViewDues from "./pages/ViewDues";
import UpdateDues from "./pages/UpdateDues"
import Reminder from "./pages/Reminder";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addCustomer" element={<AddCustomer />} />
        <Route path="/removeCustomer" element={<RemoveCustomer />} />
        <Route path="/viewDues" element={<ViewDues />} />
        <Route path="/updateDues" element={<UpdateDues />} />
        <Route path="/reminder" element={<Reminder />} />
      </Routes>
    </Router>
  );
};

export default App;
