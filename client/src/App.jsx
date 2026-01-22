import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";
import PizzaList from "./components/PizzaList"; // Home

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";

// Admin pages
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminPizzas from "./admin/pages/AdminPizzas";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminUsers from "./admin/pages/AdminUsers";
import AddPizza from "./admin/pages/AddPizza";
import ManageOrders from "./admin/pages/ManageOrders";

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
        {/* Public / User routes */}
        <Route path="/" element={<PizzaList cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

        {/* Keep old admin-dashboard redirect to new /admin */}
        <Route path="/admin-dashboard" element={<Navigate to="/admin" replace />} />

        {/* Admin routes (protected) */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/pizzas" element={<AdminRoute><AdminPizzas /></AdminRoute>} />
        <Route path="/admin/add-pizza" element={<AdminRoute><AddPizza /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/manage-orders" element={<AdminRoute><ManageOrders /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />

        {/* Fallback for unmatched routes (optional) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;