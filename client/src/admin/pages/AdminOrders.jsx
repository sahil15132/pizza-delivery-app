import { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
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

const updateStatus = async (orderId, status) => {
  try {
    await fetch(
      `http://localhost:5000/api/orders/${orderId}/status`,
      {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    fetchOrders();
  } catch (err) {
    console.error(err);
  }
};


  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Preparing":
        return "blue";
      case "Out for Delivery":
        return "purple";
      case "Delivered":
        return "green";
      default:
        return "black";
    }
  };

  return (
    <div>
      <h2>🛠 Admin Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p><b>User:</b> {order.user?.email}</p>
          <p>
            <b>Status:</b>{" "}
            <span style={{ color: statusColor(order.status) }}>
              {order.status}
            </span>
          </p>

          <select
            value={order.status}
            onChange={(e) =>
              updateStatus(order._id, e.target.value)
            }
          >
            <option>Pending</option>
            <option>Preparing</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
          </select>

          <p><b>Total:</b> ₹{order.totalPrice}</p>

          <ul>
            {order.pizzas.map((p) => (
              <li key={p._id}>
                {p.pizza?.name} × {p.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
