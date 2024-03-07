import React, { useState, useEffect, useCallback } from "react";
import "./youtube.css";

const YouTubeSearch = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailsVisible, setThumbnailsVisible] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchVideos = useCallback(async () => {
    if (!searchQuery) return;
    setIsLoading(true);

    const apiKey = "AIzaSyB-9GeQukRdy62c2w0qIubNRj3inCULBB8";
    let allVideos = [];

    // Move medicalChannels inside the useCallback callback
    const medicalChannels = [
      "UCmTe0LsfEbpkDpgrxKAWbRA",
      "UCuGyKVhuCa_iattvhM4DlQQ",
      "UC9ntcNPNxVo-32uE2Fv_u7A",
      "UCHlBaw2X5iYQGJhd5v718Zw",
      "UCNAZjyS5XZQVUCWjyOPkqjQ",
      "UCCShjixik3HwsLAIrBPGvbw",
      "UCJASBOyF4Fkd26SIwRhLuZw",
    ];

    for (const channelId of medicalChannels) {
      const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&q=${encodeURIComponent(
        searchQuery
      )}&type=video&maxResults=5`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        allVideos = allVideos.concat(data.items);
        if (allVideos.length >= 5) break;
      } catch (error) {
        console.error("Error fetching videos:", error);
        break; // Exit loop if an error occurs
      }
    }

    setVideos(allVideos.slice(0, 5));
    setIsLoading(false);
  }, [searchQuery]);

  useEffect(() => {
    // Initialize all thumbnails as visible when videos are fetched
    const initialVisibility = videos.reduce((acc, video) => {
      acc[video.id.videoId] = true; // Set each video's thumbnail to be visible initially
      return acc;
    }, {});
    setThumbnailsVisible(initialVisibility);
  }, [videos]);

  const handleThumbnailClick = (videoId) => {
    // Hide the thumbnail for the clicked video
    setThumbnailsVisible((prev) => ({ ...prev, [videoId]: false }));
    const iframe = document.getElementById(`youtube-player-${videoId}`);
    iframe.style.display = "block";
    iframe.src += "&autoplay=1&mute=1";
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for videos..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="search-input"
      />
      <button onClick={fetchVideos} className="search-button">
        Search
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="video-list">
          {videos.map((video) => (
            <div key={video.id.videoId} className="video-item">
              <div className="vidcard">
                {/* Show thumbnail based on its visibility state */}
                {thumbnailsVisible[video.id.videoId] && (
                  <img
                    src="anatoplay.png"
                    alt="Custom Thumbnail"
                    className="custom-thumbnail"
                    onClick={() => handleThumbnailClick(video.id.videoId)}
                  />
                )}
                <iframe
                  id={`youtube-player-${video.id.videoId}`}
                  title={video.snippet.title}
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.id.videoId}?enablejsapi=1&version=3&playerapiid=ytplayer`}
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    display: thumbnailsVisible[video.id.videoId]
                      ? "none"
                      : "block",
                  }} // Display based on thumbnail visibility
                ></iframe>
              </div>
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
