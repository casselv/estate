import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./blog.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://estateserver-production.up.railway.app/api/blogPosts"
        );
        if (!response.ok) throw new Error("Data could not be fetched!");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched or on error
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="blog-list">
      {blogs.map((blog) => {
        // Move the date formatting logic inside the map function
        const isoDateString = blog.publish_date;
        const date = new Date(isoDateString);

        // Format each date
        const formattedDate = date.toLocaleDateString("en-US", {
          weekday: "long", // "Thursday"
          year: "numeric", // "2024"
          month: "long", // "February"
          day: "numeric", // "14"
        });

        return (
          <Link
            to={`/blog/${blog.slug}`}
            key={blog.id}
            className="blog-item-link"
          >
            <div className="blog-item">
              <img
                src={blog.header_image_url}
                alt={blog.title}
                className="blog-image"
              />
              <h2 className="blog-title">{blog.title}</h2>
              <h3 className="blog-date">{formattedDate}</h3>{" "}
              {/* Use formattedDate here */}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;
