import React, { useState, useEffect } from "react";
import Product from "./Product";
import "./productlist.css";

const ProductList = ({
  onAddToCart,
  cart,
  cartItemCount,
  handleRemoveFromCart,
}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(
    localStorage.getItem("popupDismissed") !== "true"
  );
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://estateserver-production.up.railway.app/api/products"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("There was a problem fetching the product data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    return a.id - b.id;
  });

  const productCounts = products.length;

  const handleClosePopup = () => {
    localStorage.setItem("popupDismissed", "true"); // Set the flag in local storage
    setShowPopup(false); // Close the popup
  };

  return (
    <div>
      {showPopup && (
        <>
          <div className="popup">
            <p>Currently Accepting Orders in Australia Only</p>
            <img className="ausonly" src="aus.svg" alt=""></img>
            <button onClick={handleClosePopup}>Close</button>
          </div>
          <div className="overlay"></div>
        </>
      )}
      <img className="godgiven" src="./banner5.png" alt=""></img>
      <div className={`dashboard ${showPopup ? "blurred" : ""}`}>
        <div className="productcount">
          {" "}
          <span>Results </span> {productCounts}{" "}
        </div>
      </div>
      {isLoading ? (
        <div className="loading-screen">Loading...</div> // Display loading message or spinner
      ) : (
        <div className="product-list">
          {sortedProducts.map((product) => (
            <Product
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              products={products}
              cart={cart}
              cartItemCount={cartItemCount}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
