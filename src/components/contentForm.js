import React, { useState } from "react";
import "./content.css";

const BlogPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    publishDate: "",
    tags: "",
  });
  const [file, setFile] = useState(null); // State for storing the uploaded file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Capture the file from the input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData to handle file upload
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (file) {
      data.append("image", file); // Append the file under the key 'image'
    }

    // Modify the fetch request to handle multipart/form-data
    const response = await fetch("http://localhost:3018/api/blogPosts", {
      method: "POST",
      body: data, // Send the FormData object
      // Do not set Content-Type header, the browser will set it with the correct boundary
    });

    if (response.ok) {
      console.log("Blog post added successfully");
      // Reset form or give feedback to the user
    } else {
      console.error("Failed to add blog post");
      // Handle errors or give feedback to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="content"
        placeholder="Content"
        value={formData.content}
        onChange={handleChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
      />
      <input
        type="date"
        name="publishDate"
        value={formData.publishDate}
        onChange={handleChange}
      />
      <input type="file" name="image" onChange={handleFileChange} />
      <button type="submit">Add Blog Post</button>
    </form>
  );
};

export default BlogPostForm;
