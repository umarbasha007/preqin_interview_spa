import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InvestorTable from "./components/InvestorTable";
import InvestorDetails from "./components/InvestorDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvestorTable />} />
        <Route path="/investors/:investorId" element={<InvestorDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
