import PizzaCard from "./PizzaCard";

function PizzaList({ pizzas = [] }) {
  return (
    <div>
      {pizzas.map((pizza) => (
        <div key={pizza._id}>
          <h3>{pizza.name}</h3>
          <p>₹{pizza.price}</p>
        </div>
      ))}
    </div>
  );
}

export default PizzaList;
