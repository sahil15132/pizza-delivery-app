import { useState } from "react";   // 👈 ADD THIS
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PizzaList from "./components/PizzaList";
import Cart from "./components/Cart";
import MyOrders from "./pages/MyOrders";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <h1>🍕 Pizza Delivery App</h1>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <PizzaList cart={cart} setCart={setCart} />
              <Cart cart={cart} setCart={setCart} />
            </>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<MyOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
