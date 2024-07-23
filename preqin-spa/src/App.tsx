import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import InvestorTable from "./components/InvestorTable";
// import InvestorDetails from "./components/InvestorDetails";

// Lazy load the components
const InvestorTable = lazy(() => import("./components/InvestorTable"));
const InvestorDetails = lazy(() => import("./components/InvestorDetails"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<InvestorTable />} />
          <Route path="/investors/:investorId" element={<InvestorDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
