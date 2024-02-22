import React from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";

// import necessary items for routing

const Cart = ({ cart, handleRemoveFromCart, toggleCart }) => {
  console.log("check the import", cart);
  const navigate = useNavigate();

  const navigateToCheckout = () => {
    toggleCart();
    navigate("/checkout", { state: { cart } });
  };

  // Function to calculate total
  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      // Remove the "$" symbol and convert the price to a number
      const priceWithoutSymbol = parseFloat(item.price.replace("$", ""));

      // Calculate the total for each item and accumulate it
      return acc + priceWithoutSymbol * item.quantity;
    }, 0);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div className="cartier" key={item.id}>
            <h3 className="itemname">{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <img className="itemimages" src={item.image_urls[0]} alt="" />
            <p>{item.price}</p>
            <button
              className="removal"
              onClick={() => handleRemoveFromCart(item.id)}
            >
              remove
            </button>
            {/* Display item price, consider formatting the price */}
          </div>
        ))
      )}
      {cart.length > 0 && (
        <div className="addup">
          <p>Total: ${calculateTotal()}</p>
          <button className="boss" onClick={navigateToCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
