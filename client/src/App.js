import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login";
import DashboardPage from "./components/dashboard";
import ConfirmationPage from "./components/confirmation";
import Checkout from "./components/checkout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
};

export default App;
