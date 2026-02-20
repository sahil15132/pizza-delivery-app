import { useEffect, useState } from "react";

function AdminPizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchPizzas = () => {
    fetch("https://pizzahouse-a5kn.onrender.com/api/pizzas")
      .then(res => res.json())
      .then(data => setPizzas(data));
  };

  useEffect(fetchPizzas, []);

  const addPizza = async () => {
    await fetch("https://pizzahouse-a5kn.onrender.com/api/pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, price }),
    });

    setName("");
    setPrice("");
    fetchPizzas();
  };

  const deletePizza = async (id) => {
    await fetch(`https://pizzahouse-a5kn.onrender.com/api/pizzas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchPizzas();
  };

  return (
    <div>
      <h2>🍕 Admin – Manage Pizzas</h2>

      <input
        placeholder="Pizza name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <button onClick={addPizza}>Add Pizza</button>

      <hr />

      {pizzas.map(p => (
        <div key={p._id}>
          {p.name} — ₹{p.price}
          <button onClick={() => deletePizza(p._id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default AdminPizzas;
