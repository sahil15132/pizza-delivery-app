import axios from "axios";

function PizzaCard({ pizza, cart, setCart }) {
  const addToCart = () => {
    // Check if pizza is already in cart
    const exists = cart.find((item) => item._id === pizza._id);

    if (exists) {
      // If it exists, increase quantity
      setCart(
        cart.map((item) =>
          item._id === pizza._id ? { ...exists, quantity: exists.quantity + 1 } : item
        )
      );
    } else {
      // If new, add to cart with quantity 1
      setCart([...cart, { ...pizza, quantity: 1 }]);
    }
    alert(`${pizza.name} added to cart!`);
  };

  return (
  <div className="pizza-card">
    <div className="pizza-image-wrapper">
      <img src={pizza.image} alt={pizza.name} />
    </div>
    <div className="pizza-info">
      <h3>{pizza.name}</h3>
      <p>{pizza.description}</p>
      <div className="pizza-price-action">
        <span className="price">₹{pizza.price}</span>
        <button className="add-btn" onClick={() => addToCart(pizza)}>
          Add To Cart
        </button>
      </div>
    </div>
  </div>
);
}

export default PizzaCard;