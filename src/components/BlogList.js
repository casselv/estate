import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./blog.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3018/api/blogPosts");
        if (!response.ok) throw new Error("Data could not be fetched!");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <Link to={`/blog/${blog.id}`} key={blog.id} className="blog-item-link">
          <div className="blog-item">
            <img
              src={blog.header_image_url}
              alt={blog.title}
              className="blog-image"
            />
            <h2 className="blog-title">{blog.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
