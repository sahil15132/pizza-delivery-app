import { useEffect, useState } from "react";
import PizzaCard from "./PizzaCard";

function PizzaList({ cart, setCart }) {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const res = await fetch("https://pizzahouse-a5kn.onrender.com/api/pizzas");
      const data = await res.json();
      setPizzas(data);
    } catch (err) {
      console.error("Error fetching pizzas:", err);
    }
  };

return (
  <div className="pizza-container">
    <h1 className="main-title">🍕 Fresh From The Oven</h1>
    <div className="pizza-grid">
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