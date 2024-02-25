import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./blog.css";

const BlogPost = () => {
  const { id } = useParams(); // Extracting the blog post ID from the URL
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3018/api/blogPosts/${id}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch post data!");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]); // Dependency array with id ensures this effect runs whenever the id changes

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found.</div>;

  return (
    <article>
      <img className="blogimage" src={post.header_image_url} alt={post.title} />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.author}</p>
      <p>{post.publish_date}</p>
      {/* Add more post details here */}
    </article>
  );
};

export default BlogPost;
