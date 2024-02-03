import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./details.css"; // Ensure your CSS path is correct

const Details = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3013/api/products/${productId}`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const product = await response.json();
        console.log("ok", product);

        setProduct(product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="detailed">
      <div className="imaged">
        {product.image_urls.map((url, index) => (
          <img
            key={index}
            className="productimaged"
            src={url}
            alt={`Product ${index + 1}`}
          />
        ))}
      </div>
      <div className="text">
        <h1 className="productname">{product.name}</h1>
        <h4 className="productPrice">{product.price}</h4>
        <p className="productdescriptor">{product.description}</p>
        {/* Assuming you handle adding to cart elsewhere */}
        <button className="productbutton">Add to Cart</button>
      </div>
    </div>
  );
};

export default Details;
