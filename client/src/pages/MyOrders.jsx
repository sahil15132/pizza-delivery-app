import { useEffect, useState } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/orders/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return {
          color: "gray",
          background: "#e2e3e5",
        };
      case "preparing":
        return {
          color: "#856404",
          background: "#fff3cd",
        };
      case "delivered":
        return {
          color: "green",
          background: "#d4edda",
        };
      default:
        return {
          color: "black",
          background: "#f8f9fa",
        };
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>📦 My Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #444",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <p>
            <b>Order ID:</b> {order._id}
          </p>

          <p>
            <b>Status:</b>{" "}
            <span
              style={{
                ...getStatusStyle(order.status),
                padding: "4px 10px",
                borderRadius: "6px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {order.status}
            </span>
          </p>

          <p>
            <b>Total:</b> ₹{order.totalPrice}
          </p>

          <p>
            <b>Ordered At:</b>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          <hr />

          <b>Pizzas:</b>
          {order.pizzas.map((item, index) => (
            <p key={index}>
              🍕 {item.pizza?.name} × {item.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
