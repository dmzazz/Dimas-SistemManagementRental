import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import File
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";
import Order from "./components/Order";
import Rental from "./components/Rental";
import Supplier from "./components/Supplier";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="Login" element={<Login />} />
        <Route
          path="/"
          element={<Sidebar />}
          children={
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Inventory" element={<Inventory />} />
              <Route path="Order" element={<Order />} />
              <Route path="Rental" element={<Rental />} />
              <Route path="Supplier" element={<Supplier />} />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
