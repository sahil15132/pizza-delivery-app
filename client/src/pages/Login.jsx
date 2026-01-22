import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      setUser(data.user);
      
      // Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
  <div className="auth-container">
    <form onSubmit={handleLogin} className="auth-card">
      <h2>Login 🍕</h2>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="email@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-btn">Login</button>

      <p className="auth-switch">
        New user? <Link to="/register">Register here</Link>
      </p>
    </form>
  </div>
);
}

export default Login;