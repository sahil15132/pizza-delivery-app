import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>All Orders</h2>

      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><b>User:</b> {order.user?.email}</p>
          <p><b>Total:</b> ₹{order.totalPrice}</p>
          <p><b>Status:</b> {order.status}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
