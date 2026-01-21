import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
    pizzas: cart.map(item => ({
      pizza: item._id,
      quantity: item.quantity,
    })),
    totalPrice: total,
  }),
});

    if (!res.ok) {
      throw new Error("Order failed");
    }

    alert("Order placed successfully 🎉");
    setCart([]);
  } catch (err) {
    alert("Failed to place order");
    console.error(err);
  }
};


  return (
    <div style={{ marginTop: "30px" }}>
      <h2>🛒 Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item) => (
        <div
          key={item._id}
          style={{
            borderBottom: "1px solid gray",
            padding: "10px 0",
          }}
        >
          <b>{item.name}</b> — ₹{item.price} × {item.quantity}
          <div style={{ marginTop: "5px" }}>
            <button onClick={() => decreaseQty(item._id)}>➖</button>
            <button onClick={() => increaseQty(item._id)}>➕</button>
            <button onClick={() => removeItem(item._id)}>❌</button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h3>Total: ₹{total}</h3>
          <button onClick={placeOrder}>✅ Place Order</button>
        </>
      )}
    </div>
  );
}

export default Cart;
