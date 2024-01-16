import React from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";

// import necessary items for routing
import { Link } from "react-router-dom";

const Cart = ({ cart }) => {
  const navigate = useNavigate();

  const navigateToCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };

  // Function to calculate total
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            {/* Display item price, consider formatting the price */}
          </div>
        ))
      )}
      {cart.length > 0 && (
        <>
          <p>Total: ${calculateTotal().toFixed(2)}</p>
          <button className="boss" onClick={navigateToCheckout}>
            Checkout
          </button>
          {/* Replace "/checkout" with your checkout route */}
        </>
      )}
    </div>
  );
};

export default Cart;
