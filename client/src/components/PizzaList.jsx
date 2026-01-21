import { useEffect, useState } from "react";
import PizzaCard from "./PizzaCard";

function PizzaList({ cart, setCart }) {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    const res = await fetch("http://localhost:5000/api/pizzas");
    const data = await res.json();
    setPizzas(data);
  };

  return (
    <div>
      <h2>🍕 Available Pizzas</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {pizzas.map((pizza) => (
          <PizzaCard
            key={pizza._id}
            pizza={pizza}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
    </div>
  );
}

export default PizzaList;
