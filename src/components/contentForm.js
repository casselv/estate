import React, { useState } from "react";
import "./content.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlogPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    publishDate: "",
    tags: "",
  });
  const [file, setFile] = useState(null); // State for storing the uploaded file

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[\s+]/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      // If the title is being updated, generate a new slug
      if (name === "title") {
        const slug = generateSlug(value);
        return {
          ...prevState,
          title: value,
          slug, // Assuming you've added a slug field to your form data
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Capture the file from the input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, content, author, publishDate } = formData;
    if (!title || !content || !author || !publishDate) {
      alert("Please fill out all the fields");
      return; // Stop the form submission process
    }

    // Use FormData to handle file upload
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (file) {
      data.append("image", file); // Append the file under the key 'image'
    }

    // Modify the fetch request to handle multipart/form-data
    const response = await fetch(
      "https://estateserver-production.up.railway.app/api/blogPosts",
      {
        method: "POST",
        body: data, // Send the FormData object
        // Do not set Content-Type header, the browser will set it with the correct boundary
      }
    );

    if (response.ok) {
      alert("Blog post added successfully");

      // Reset form data and file state
      setFormData({
        title: "",
        content: "",
        author: "",
        publishDate: "",
        tags: "",
      });
      setFile(null);

      // Increment key to reset React Quill editor
    } else {
      alert("Failed to add blog post");
      // Handle errors or give feedback to the user
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
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
      <ReactQuill
        value={formData.content}
        onChange={(content) => setFormData({ ...formData, content })}
        modules={modules}
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
