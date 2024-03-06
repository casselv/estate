import React, { useState, useEffect } from "react";

const YouTubeSearch = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      const apikez = "AIzaSyAQ2Sec_vHVUvrcqpH7CWuK16Rb6hN0Pdw";
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${apikez}&part=snippet&q=${encodeURIComponent(
            query
          )}&type=video&maxResults=5`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchVideos();
    }
  }, [query]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for medical topics"
        />
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {videos.map((video) => (
            <div key={video.id.videoId}>
              <iframe
                title={video.snippet.title}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h3>{video.snippet.title}</h3>
              <p>{video.snippet.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YouTubeSearch;
