import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OwnerDashboard from "./pages/OwnerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import AddCustomer from "./pages/AddCustomer";
import RemoveorEdit from "./pages/RemoveorEdit";
import ViewDues from "./pages/ViewDues";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customerDashboard" element={<CustomerDashboard />} />
        <Route path="/ownerDashboard" element={<OwnerDashboard />} />
        <Route path="/addCustomer" element={<AddCustomer />} />
        <Route path="/removeOrEdit" element={<RemoveorEdit />} />
        <Route path="/viewDues" element={<ViewDues />} />

      </Routes>
    </Router>
  );
};

export default App;
