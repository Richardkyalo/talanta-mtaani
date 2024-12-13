'use client';

import { useEffect, useState } from "react";
// import { FaDownload } from "react-icons/fa";
import { IoClose } from "react-icons/io5"; // Import Close Icon

export default function Highlights() {
  const [highlights, setHighlights] = useState({ images: [], videos: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Track selected image

  useEffect(() => {
    async function fetchHighlights() {
      try {
        const response = await fetch("/api/previousnonpublishedhighlights");
  
        if (!response.ok) {
          throw new Error(`Failed to fetch highlights. Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data && data.images && data.videos) {
          setHighlights(data);
        } else {
          throw new Error("Invalid data structure received from API.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        console.error("Error fetching highlights:", err);
      } finally {
        setLoading(false);
      }
    }
  
    fetchHighlights();
  }, []);
  

  const openImage = (image) => {
    setSelectedImage(image); // Set the selected image
  };

  const closeImage = () => {
    setSelectedImage(null); // Clear the selected image
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading highlights...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600 text-lg">Error: {error}</div>;
  }

  // Group highlights by year (images only for now)
  const groupedImages = highlights.images.reduce((acc, item) => {
    if (!acc[item.year]) acc[item.year] = [];
    acc[item.year].push(item);
    return acc;
  }, {});

  // Log the grouped images to check their structure
//   console.log("Grouped images:", groupedImages);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Kuza Memories</h1>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Images</h2>
        {Object.keys(groupedImages).length === 0 ? (
          <div className="text-center text-lg text-gray-600">No images available.</div>
        ) : (
          Object.keys(groupedImages).map((year) => (
            <div key={year} className="mb-8">
              <h3 className="text-xl font-medium text-gray-700 mb-3">{year}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {groupedImages[year].map((image) => (
                  <img
                    key={image.url}
                    src={image.url}
                    alt={image.file}
                    className="w-full h-40 object-cover rounded-lg shadow hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => openImage(image)} // Open modal on click
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={closeImage}
            >
              <IoClose size={28} />
            </button>

            {/* Image */}
            <div className="flex flex-col items-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.file}
                className="w-full max-h-96 object-contain rounded-lg"
              />
            </div>

            {/* Download Button */}
            {/* <a
              href={selectedImage.url}
              download={selectedImage.file}
              className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              <FaDownload size={20} />
            </a> */}
          </div>
        </div>
      )}
    </div>
  );
}
