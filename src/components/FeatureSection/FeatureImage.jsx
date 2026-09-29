import React, { useState } from 'react';
import TaskCard from './TaskCard';
import defaultFeatureImage from './assets/feature-image.jpg';

/**
 * FeatureImage Component
 * Left column showcasing the hero photo, hand-drawn decorative purple accents,
 * and the floating interactive task card.
 *
 * @param {Object} props
 * @param {string} [props.imageSrc] - Custom image URL (defaults to bundled asset)
 * @param {string} [props.imageAlt] - Alt text for accessibility
 * @param {Array} [props.tasks] - Optional tasks array to pass to TaskCard
 * @param {string} [props.className=''] - Additional CSS classes
 */
export const FeatureImage = ({
  imageSrc,
  imageAlt = 'Professional woman collaborating on laptop at a modern workspace desk',
  tasks,
  className = '',
}) => {
  // Graceful fallback to bundled asset or high-res Unsplash workspace photo
  const [currentSrc, setCurrentSrc] = useState(imageSrc || defaultFeatureImage);

  const handleImageError = () => {
    // If bundled asset fails or prop fails, fallback to public static or curated Unsplash image
    if (currentSrc !== '/assets/images/feature-image.jpg') {
      setCurrentSrc('/assets/images/feature-image.jpg');
    } else {
      setCurrentSrc(
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80'
      );
    }
  };

  return (
    <div className={`feature-image-wrapper ${className}`}>
      {/* Hand-drawn purple decorative marks */}
      {/* Top-Right Sparkle / Hand-drawn burst */}
      <svg
        className="decor-sparkle-1"
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M22 2C22 13 31 22 42 22C31 22 22 31 22 42C22 31 13 22 2 22C13 22 22 13 22 2Z"
          fill="#8B5CF6"
          fillOpacity="0.85"
        />
        <circle cx="37" cy="8" r="2" fill="#7C3AED" />
        <circle cx="7" cy="36" r="1.5" fill="#7C3AED" />
      </svg>

      {/* Mid-Left Hand-drawn curved doodle accent */}
      <svg
        className="decor-sparkle-2"
        width="38"
        height="42"
        viewBox="0 0 38 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 10C14 6 28 8 32 18C35 25 31 34 22 36C15 37 9 32 10 26C11 20 18 17 24 20"
          stroke="#7C3AED"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 2"
        />
      </svg>

      {/* Main Image Frame */}
      <div className="feature-image-frame">
        <img
          src={currentSrc}
          alt={imageAlt}
          className="feature-main-image"
          onError={handleImageError}
          loading="lazy"
        />
        {/* Subtle inner gradient shadow for depth */}
        <div className="feature-image-overlay" aria-hidden="true" />
      </div>

      {/* Floating Task Card Over bottom-left */}
      <TaskCard tasks={tasks} />
    </div>
  );
};

export default FeatureImage;
