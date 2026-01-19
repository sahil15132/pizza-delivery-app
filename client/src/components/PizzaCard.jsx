function PizzaCard({ pizza, cart, setCart }) {
  const addToCart = () => {
    setCart([...cart, pizza]);
  };

  return (
    <div className="card">
      <h3>{pizza.name}</h3>
      <p>₹{pizza.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default PizzaCard;
