import React, { useState } from 'react';
import Footer from '../layout/Footer';

const ImageGrid = ({ images, searchTerm, totalResults }) => {
  const [selectedImages, setSelectedImages] = useState(new Set());

  const toggleImageSelection = (imageId) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setSelectedImages(newSelected);
  };

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          No images found for "{searchTerm}". Try a different search term.
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="space-y-6">
      {/* Search info and selection counter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="text-gray-700">
          <span className="font-semibold">You searched for "{searchTerm}"</span>
          <span className="text-gray-500 ml-2">— {totalResults} results</span>
        </div>
        
        {selectedImages.size > 0 && (
          <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg font-medium">
            Selected: {selectedImages.size} image{selectedImages.size !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className={`image-card bg-white rounded-xl shadow-md overflow-hidden border-2 ${
              selectedImages.has(image.id) ? 'border-primary-500 ring-2 ring-primary-200' : 'border-transparent'
            }`}
          >
            <div className="relative group">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-48 object-cover"
              />
              
              {/* Selection overlay */}
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 smooth-transition">
                <div className="absolute top-3 right-3">
                  <input
                    type="checkbox"
                    checked={selectedImages.has(image.id)}
                    onChange={() => toggleImageSelection(image.id)}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Image info overlay */}
              <div className="absolute bottom-0 left-0 right-0 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 smooth-transition">
                <div className="text-sm font-medium truncate">{image.alt}</div>
                <div className="text-xs opacity-90">by {image.photographer}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ImageGrid;