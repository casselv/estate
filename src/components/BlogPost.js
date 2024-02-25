import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./blog.css";

const BlogPost = () => {
  const { slug } = useParams(); // Extracting the blog post ID from the URL
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://estateserver-production.up.railway.app/api/blogPosts/${slug}`
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
  }, [slug]); // Dependency array with id ensures this effect runs whenever the id changes

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found.</div>;

  const isoDateString = post.publish_date;
  const date = new Date(isoDateString);

  // Example of a simple human-friendly format:
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long", // "Thursday"
    year: "numeric", // "2024"
    month: "long", // "February"
    day: "numeric", // "14"
  });

  return (
    <article>
      <img className="blogimage" src={post.header_image_url} alt={post.title} />
      <h1>{post.title}</h1>
      <div
        className="actualtext"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      <p>{post.author}</p>
      <p>{formattedDate}</p>
      {/* Add more post details here */}
    </article>
  );
};

export default BlogPost;
