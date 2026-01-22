import { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/users/${id}`, { role }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      alert("User role updated");
    } catch (err) {
      console.error("Error updating role:", err);
      alert("Failed to update role");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      alert("User deleted");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  return (
    <div>
      <h2>All Users</h2>

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Role</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td style={{ padding: '8px' }}>{u.name}</td>
              <td style={{ padding: '8px' }}>{u.email}</td>
              <td style={{ padding: '8px' }}>{u.role}</td>
              <td style={{ padding: '8px' }}>
                {u.role !== "admin" ? (
                  <button onClick={() => updateRole(u._id, "admin")} style={{ marginRight: 8 }}>Promote to Admin</button>
                ) : (
                  <button onClick={() => updateRole(u._id, "customer")} style={{ marginRight: 8 }}>Demote to Customer</button>
                )}
                <button onClick={() => deleteUser(u._id)} style={{ background: '#e74c3c', color: 'white' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;