import { useEffect, useState } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://pizzahouse-a5kn.onrender.com/api/orders/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>📦 My Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <p>
            <b>Status:</b>{" "}
            <span
              style={{
                color: order.status === "pending" ? "orange" : "green",
                fontWeight: "bold",
              }}
            >
              {order.status.toUpperCase()}
            </span>
          </p>

          <p><b>Total:</b> ₹{order.totalPrice}</p>

          <ul>
            {order.items?.map((item, index) => (
              <li key={index}>
                {item.pizza?.name} × {item.quantity}
              </li>
            ))}
          </ul>

          <small>
            Ordered on: {new Date(order.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;