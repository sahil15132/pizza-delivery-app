import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";
import PizzaList from "./components/PizzaList"; // This is your Home

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";

// Admin
import AdminDashboard from "./admin/pages/AdminDashboard";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && savedUser !== "undefined") {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} cartCount={cart.length} />
      <Routes>
        {/* Set PizzaList as the root page */}
        <Route path="/" element={<PizzaList cart={cart} setCart={setCart} />} />
        
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        
        <Route 
          path="/admin-dashboard" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;