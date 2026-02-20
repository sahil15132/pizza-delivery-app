import { useState } from "react";

function AddPizza() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://pizzahouse-a5kn.onrender.com", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Pizza added to the menu! 🍕");
        setFormData({ name: "", price: "", description: "", image: "" });
      }
    } catch (err) {
      alert("Error adding pizza");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Add New Pizza 🛠️</h2>
        <p className="auth-subtitle">Expand your menu for customers</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Pizza Name</label>
            <input
              type="text"
              placeholder="e.g. Mexican Wave"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              placeholder="e.g. 350"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              placeholder="Paste Unsplash link here"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-group input" // Reusing input styles
              style={{ width: '100%', height: '80px', padding: '10px', background: '#1e1e1e', color: 'white', border: '1px solid #444', borderRadius: '6px' }}
              placeholder="Describe the toppings..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Publish to Store
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPizza;