import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import this only if you're using React Router
import "./navbar.css"; // Make sure to create a corresponding CSS file
import Cart from "./cart";

const NavigationBar = ({ cart, cartItemCount, handleRemoveFromCart }) => {
  const [isCartVisible, setCartVisible] = useState(false);
  //const cartRef = useRef(null);

  const toggleCart = () => {
    setCartVisible(!isCartVisible);
  };

  useEffect(() => {
    console.log("effect is working");

    const handleClickOutside = (event) => {
      console.log("click is working", event.target);

      // Check if the clicked element or any of its ancestors have a "cart" class
      let target = event.target;
      let isInsideCart = false;

      while (target) {
        if (target.classList.contains("cart")) {
          isInsideCart = true;
          break;
        }
        target = target.parentElement;
      }

      // If not inside the cart, close it
      if (!isInsideCart) {
        setCartVisible(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cartStyle = {
    right: isCartVisible ? "0" : "-100%", // Slide in when visible, slide out when hidden
  };

  /*<img
              className="weblogo"
              src="/anatolinkwebsitelogo.png"
              alt=""
            ></img> */

  return (
    <nav className="navigation-bar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">
            <img className="weblogo" src="/anatolink4.png" alt=""></img>
          </Link>
        </li>
        <div className="shoppingboss">
          <li className="nav-item">
            <Link className="shopicon" to="/Shop">
              Shop
            </Link>
          </li>
          <li>
            <div className="cart-icon" onClick={toggleCart}>
              <span className="cartItem">({cartItemCount})</span>
              <i class="fa-solid fa-cart-shopping"></i>
            </div>

            <div className="cart-container" style={cartStyle}>
              {" "}
              {/* Apply the cartStyle here */}
              <Cart
                cart={cart}
                handleRemoveFromCart={handleRemoveFromCart}
                toggleCart={toggleCart}
              />
            </div>
          </li>
        </div>
      </ul>
      <div className="menu-icon">&#9776;</div>
    </nav>
  );
};

export default NavigationBar;
