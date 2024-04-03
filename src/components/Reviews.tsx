import React from 'react';

// Define the Review interface
interface Review {
  user: string;
  comment: string;
}

// Define props for the Reviews component
interface ReviewsProps {
  reviews: Review[];
}

// Update the component to use the ReviewsProps
const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index}>
            <h4>{review.user}</h4>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;
