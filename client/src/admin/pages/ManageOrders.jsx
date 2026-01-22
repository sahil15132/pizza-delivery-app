import { useEffect, useState } from "react";
import axios from "axios";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem("token");
    await axios.patch(`http://localhost:5000/api/admin/orders/${orderId}`, 
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` }}
    );
    alert("Status Updated!");
    window.location.reload();
  };

  return (
    <div className="pizza-container" style={{ maxWidth: '1000px' }}>
      <h2 className="main-title">Live Orders 📦</h2>
      <div className="pizza-card" style={{ padding: '0', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
          <thead style={{ background: '#1e1e1e' }}>
            <tr>
              <th style={{ padding: '15px' }}>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={{ borderBottom: '1px solid #333', textAlign: 'center' }}>
                <td style={{ padding: '15px' }}>{order._id.slice(-6)}</td>
                <td>{order.user?.name}</td>
                <td>{order.items?.length ?? 0} Pizzas</td>
                <td className="price">₹{order.totalPrice}</td>
                <td>
                  <select 
                    value={order.status} 
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    style={{ background: '#1a1a1a', color: 'white', padding: '5px', borderRadius: '4px', border: '1px solid #ff9800' }}
                  >
                    <option value="Placed">Placed</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageOrders;