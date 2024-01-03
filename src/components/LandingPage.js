import React, { useEffect, useRef, useState } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [address, setAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const navigate = useNavigate(); // Use the useNavigate hook
  const autocompleteRef = useRef(null); // Create a ref for the autocomplete input
  const [imagePreviews, setImagePreviews] = useState([]);

  // Load the Google Places Autocomplete script
  useEffect(() => {
    const loadGoogleScript = () => {
      if (window.google) {
        initializeAutocomplete();
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCLnvosWRakY3oKjaYvnvN0yFvDoQGXHhw&libraries=places`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onload = () => initializeAutocomplete();
      }
    };

    loadGoogleScript();
  }, []);

  const initializeAutocomplete = () => {
    if (!autocompleteRef.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      {
        types: ["geocode"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address);
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Add the new files to the existing files
    setSelectedFile((prevFiles) => [...prevFiles, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readEvent) => {
        // Set the image preview URL in the state without resetting the existing previews
        setImagePreviews((prevPreviews) => [
          ...prevPreviews,
          readEvent.target.result,
        ]);
      };
    });
  };

  const handleSubmit = async () => {
    if (selectedFile.length === 0) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    selectedFile.forEach((file) => {
      formData.append("images", file);
    });

    const uploadUrl = "http://localhost:3011/api/upload"; // Change this to your actual endpoint

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        navigate(`/info/${address}`, {
          state: {
            imageUrl: data.imageUrl,
            selectedFile: selectedFile,
          },
        });
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error uploading the file.");
    }
  };

  return (
    <div className="landing-page">
      <input
        type="text"
        ref={autocompleteRef}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input type="file" onChange={handleFileChange} multiple id="fileInput" />

      <div className="image-preview-container">
        {imagePreviews.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Preview ${index + 1}`}
            className="image-preview"
          />
        ))}
      </div>
      <label
        htmlFor="fileInput"
        id="uploadButton"
        aria-label="Upload Images"
        className="upload-icon"
      >
        +
      </label>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default LandingPage;
