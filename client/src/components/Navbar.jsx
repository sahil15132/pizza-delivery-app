import { Link } from "react-router-dom";

function Navbar({ cart = [] }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
      <Link to="/">Home</Link>

      {role !== "admin" && <Link to="/">Cart ({cart.length})</Link>}

      {!token ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          {role === "admin" && (
            <>
              <Link to="/admin">Admin Dashboard</Link>
              <Link to="/admin/orders">Manage Orders</Link>
              <Link to="/admin/pizzas">Manage Pizzas</Link>
            </>
          )}

          {role !== "admin" && <Link to="/orders">My Orders</Link>}

          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
