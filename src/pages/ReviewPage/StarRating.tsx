import React, { useState } from 'react';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void; // Make setRating optional
  size?: number; // Star size prop
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating, size = 16 }) => {
  const [hover, setHover] = useState<number>(0);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label 
            key={index} 
            style={{ cursor: setRating ? 'pointer' : 'default', margin: '0 2px' }} // Adjust margin
            onMouseEnter={() => setRating && setHover(ratingValue)}
            onMouseLeave={() => setRating && setHover(0)}
          >
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating && setRating(ratingValue)}
              style={{ display: 'none' }}
            />
            {ratingValue <= (hover || rating) ? (
              <IoMdStar style={{ fontSize: `${size}px` }} />
            ) : (
              <IoMdStarOutline style={{ fontSize: `${size}px` }} />
            )}
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;