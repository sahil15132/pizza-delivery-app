function Cart({ cart, setCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("🛒 Cart is empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pizzas: cart.map(item => ({
            pizza: item._id,
            quantity: 1,
          })),
          totalPrice: total,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }

      alert("✅ Order placed successfully!");
      setCart([]);
      localStorage.removeItem("cart");

    } catch (err) {
      alert("❌ Order failed");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>🛒 Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <p key={index}>
            {item.name} - ₹{item.price}
          </p>
        ))
      )}

      <h3>Total: ₹{total}</h3>

      <button onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Cart;
