import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h1>🛠 Admin Dashboard</h1>
      <ul>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
        <li><Link to="/admin/pizzas">Pizzas</Link></li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
