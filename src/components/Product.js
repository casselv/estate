import React from "react";
import "./product.css";
import { Link } from "react-router-dom";

const Product = ({ product, cart, cartItemCount, handleRemoveFromCart }) => {
  console.log("Product data in Product component:", product);

  return (
    <div className="product">
      <Link to={`/details/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-details">
          <span className="price">${product.price.toFixed(2)}</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;

//        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
