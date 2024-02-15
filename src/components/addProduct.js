import React, { useState } from "react";

function AddProduct() {
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    imageUrls: "", // Changed to accommodate multiple URLs as a single string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert imageUrls from comma-separated to an array before submitting
    const submission = {
      ...item,
      imageUrls: item.imageUrls.split(",").map((url) => url.trim()), // Splitting by comma and trimming whitespace
    };

    try {
      const response = await fetch(
        "https://estateserver-production.up.railway.app/api/push",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submission),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Product added:", data);
      // Reset form
      setItem({
        name: "",
        description: "",
        price: "",
        imageUrls: "",
      });
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={item.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={item.price}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrls">Image URLs:</label>
          <textarea
            id="imageUrls"
            name="imageUrls"
            value={item.imageUrls}
            onChange={handleChange}
            placeholder="Enter image URLs separated by commas"
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
