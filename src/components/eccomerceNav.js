import React, { useState } from "react";
import "./eccomerce.css"; // Assuming you have a CSS file for styling
import Cart from "./cart";

const EccomerceNav = ({ cart, cartItemCount, handleRemoveFromCart }) => {
  const [isCartVisible, setCartVisible] = useState(false);

  // Function to toggle cart visibility
  const toggleCart = () => {
    setCartVisible(!isCartVisible);
  };

  return (
    <nav className="secondary-nav">
      <div className="cart-icon">
        {/* Add cart icon with a link to the cart here */}
      </div>
      <div className="cart-icon" onClick={toggleCart}>
        <span className="cartItem">({cartItemCount})</span>
        Cart
      </div>

      {isCartVisible && (
        <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} />
      )}
    </nav>
  );
};

export default EccomerceNav;
