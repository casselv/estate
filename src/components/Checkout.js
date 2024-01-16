import React from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { cart } = location.state;

  // Function to calculate total price
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <h3>Your Cart Items:</h3>
        {cart.map((item) => (
          <div key={item.id}>
            <p>
              {item.name} - Quantity: {item.quantity} - Price: ${item.price}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h4>Total: ${calculateTotal().toFixed(2)}</h4>
      </div>

      {/* Checkout form goes here */}
      <form>{/* Form inputs for shipping and payment details */}</form>
    </div>
  );
};

export default Checkout;
