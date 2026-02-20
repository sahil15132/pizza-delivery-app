import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0 });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://pizzahouse-a5kn.onrender.com", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data || { totalRevenue: 0, totalOrders: 0 });
    } catch (err) {
      console.error("Error fetching admin stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="pizza-container">
      {/* Admin Sub-Nav */}
      <div className="admin-nav" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '30px' }}>
        <Link to="/admin" className="admin-link active">Stats</Link>
        <Link to="/admin/pizzas" className="admin-link">Manage Pizzas</Link>
        <Link to="/admin/orders" className="admin-link">Manage Orders</Link>
        <Link to="/admin/users" className="admin-link">Manage Users</Link>
      </div>

      <h1 className="main-title">Admin Control Panel 🛠️</h1>
      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
        <button onClick={fetchStats} className="submit-btn" style={{width: 'auto', padding: '8px 16px'}}>
          Refresh Stats 🔄
        </button>
      </div>

      <div className="pizza-grid">
        <div className="pizza-card" style={{ padding: '20px', textAlign: 'center' }}>
          <h3>Total Revenue</h3>
          <p className="price" style={{ fontSize: '2.5rem' }}>₹{stats.totalRevenue}</p>
        </div>
        <div className="pizza-card" style={{ padding: '20px', textAlign: 'center' }}>
          <h3>Total Orders</h3>
          <p className="price" style={{ fontSize: '2.5rem' }}>{stats.totalOrders}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;