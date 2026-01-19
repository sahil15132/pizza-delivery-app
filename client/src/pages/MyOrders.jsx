import { useEffect, useState } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/orders/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setOrders(data);
  };

  return (
    <div>
      <h2>📦 My Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Total:</b> ₹{order.totalPrice}</p>

          <ul>
            {order.pizzas.map((item, index) => (
              <li key={index}>
                {item.pizza.name} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
