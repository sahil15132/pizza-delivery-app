import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser, cartCount }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">PizzaHouse 🍕</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        
        {user ? (
          <>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <span className="user-name">Hi, {user?.name?.split(' ')[0] || 'User'}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;