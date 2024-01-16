import React from "react";
import "./product.css";

const Product = ({ product, onAddToCart }) => {
  return (
    <div className="product">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-details">
        <span className="price">${product.price.toFixed(2)}</span>
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
