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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3013/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("There was a problem fetching the product data:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <img className="godgiven" src="./banner3.png" alt=""></img>
      <div className="product-list">
        {products.map((product) => (
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
    </div>
  );
};

export default ProductList;
