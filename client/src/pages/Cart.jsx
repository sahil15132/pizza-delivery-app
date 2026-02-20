import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

const handleCheckout = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login to place an order!");
    return navigate("/login");
  }

  try {
    const formattedItems = cart.map(item => ({
      pizza: item._id,
      quantity: item.quantity || 1
    }));

    const orderData = {
      items: formattedItems,
      totalPrice
    };

    console.log("SENDING ORDER:", orderData);

    const response = await axios.post(
      "https://pizzahouse-a5kn.onrender.com/api/orders",
      orderData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 201 || response.status === 200) {
      alert("Order Placed Successfully! 🍕");
      setCart([]);
      navigate("/");
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Order failed.");
  }
};


  return (
    <div className="pizza-container">
      <h2 className="main-title">Your Order Summary 🛒</h2>
      {cart.length === 0 ? (
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <p>Your cart is empty. Let's find some pizza!</p>
          <button onClick={() => navigate("/")} className="add-btn" style={{marginTop: '15px'}}>Browse Menu</button>
        </div>
      ) : (
        <div className="auth-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {cart.map((item, index) => (
            <div key={index} className="pizza-price-action" style={{ padding: '15px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div className="pizza-image-wrapper" style={{ width: '60px', height: '60px', borderRadius: '8px' }}>
                   <img src={item.image} alt={item.name} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.name}</h3>
                  <span style={{ color: '#888' }}>Qty: {item.quantity || 1}</span>
                </div>
              </div>
              <span className="price">₹{item.price * (item.quantity || 1)}</span>
            </div>
          ))}
          
          <div style={{ marginTop: '30px', borderTop: '2px solid #333', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>Total Amount</h2>
              <span className="price" style={{ fontSize: '2rem' }}>₹{totalPrice}</span>
            </div>
            <button onClick={handleCheckout} className="submit-btn" style={{ marginTop: '25px' }}>
              Confirm & Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;