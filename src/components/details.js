import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./details.css"; // Ensure your CSS path is correct

const Details = ({ onAddToCart, isCartVisible, toggleCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false); // Default to 1 instead of 0

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Prevent quantities less than 1
  };

  const handleAddToCartAndOpen = () => {
    // Since quantity defaults to at least 1, we no longer need to check if it's > 0 here
    onAddToCart({ ...product, quantity }); // Add product with current quantity
    if (!isCartVisible) {
      toggleCart();
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://estateserver-production.up.railway.app/api/products/${productId}`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const product = await response.json();

        setProduct(product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <div className="loading-screen">Loading...</div>; // Use the full-screen loading style
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  console.log(product);

  return (
    <div className="detailed">
      <div className="imaged">
        <div className="image-coin">
          {product.image_urls.map((url, index) => (
            <img
              key={index}
              className="productimaged"
              src={url}
              alt={`Product ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="text">
        <h1 className="productname">{product.name}</h1>
        <h4 className="productPrice">{product.price}</h4>
        <p className="briefdes">{product.brief_description}</p>
        <div className="productdescriptor">
          {/* Toggle button for expanding/collapsing the description */}
          <button
            className="toggle-description"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Product Details{" "}
            <span className="toggle-symbol">{isExpanded ? "-" : "+"}</span>
          </button>
          {isExpanded && (
            <div
              className="description expanded"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
          <div className="handlingitems">
            <button
              className="productbutton"
              onClick={() => handleAddToCartAndOpen(product)}
            >
              Add to Cart
            </button>
            <div className="quantity-selector">
              <button className="quantity-button" onClick={decrementQuantity}>
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button className="quantity-button" onClick={incrementQuantity}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
