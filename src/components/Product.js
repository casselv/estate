import React from "react";
import "./product.css";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  console.log("Product data in Product component:", product);

  return (
    <div className="product">
      <Link to={`/details/${product.id}`}>
        {product.image_urls.map((url, index) => (
          <img key={index} src={url} alt={product.name} />
        ))}
        <h3>{product.name}</h3>
        <div className="product-details">
          <span className="price">{product.price}</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;

//        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
