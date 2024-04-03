import React, { useState } from 'react';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
  const [hover, setHover] = useState<number>(0);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label 
            key={index} 
            style={{ cursor: 'pointer', margin: '0 2px' }} // Adjust margin to ensure minimal gap
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              style={{ display: 'none' }}
            />
            {ratingValue <= (hover || rating) ? (
              <IoMdStar style={{ fontSize: '24px' }} />
            ) : (
              <IoMdStarOutline style={{ fontSize: '24px' }} />
            )}
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;