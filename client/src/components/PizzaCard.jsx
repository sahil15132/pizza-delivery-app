function PizzaCard({ pizza, cart, setCart }) {
  const addToCart = () => {
    const existing = cart.find((item) => item._id === pizza._id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === pizza._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...pizza, quantity: 1 }]);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", width: "220px" }}>
      <img
        src={pizza.image}
        alt={pizza.name}
        style={{ width: "100%", height: "140px", objectFit: "cover" }}
      />
      <h3>{pizza.name}</h3>
      <p>{pizza.description}</p>
      <p><b>₹{pizza.price}</b></p>

      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default PizzaCard;
