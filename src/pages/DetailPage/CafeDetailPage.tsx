// src>pages>DetailPage>CafeDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { fetchCafeDetails } from '../api'; // Assume this is an API call function
import Map from '../../components/Map'; // Assume this is a component for displaying maps
import Reviews from '../../components/Reviews'; // Assume this is a component for displaying reviews
import ReviewForm from './ReviewForm';
import StarRating from '../ReviewPage/StarRating';
import { useSelector, useDispatch } from 'react-redux';
import { addReview as addReviewAction, fetchReviews } from '../../redux/actions'; // Adjust import paths as necessary
import { RootState } from '../../redux/store';
import { Dispatch } from 'redux';
import {thunk} from 'redux-thunk';
import { Action } from 'redux'; // Import necessary types
import { Cafe } from '../../types/cafe';
import { postReview } from '../../redux/reviewSlice';
import { Review } from '../../types/types';

import {
  CafeContainer,
  CafeHeader,
  CafeName,
  Rating,
  Address,
  Phone,
  CafeImage,
  Description,
  Menu,
  MenuItem,
  ReviewItem,
  ReviewUserName,
  ReviewText,
  ReviewRating,
  WriteReviewButton
} from './CafeDetailPageStyles'; // Import styled components
import { Container } from '../Mainpage/styledComponents';
import { useAppDispatch } from '../../redux/hooks';
import ReviewsComponent from '../ReviewPage/ReviewsComponent';



// Assuming you have an interface for your action and state
interface ReviewAction {
  type: string;
  payload?: any;
}

export const addReview = (newReview: Review) => {
  return async (dispatch: Dispatch<ReviewAction>): Promise<void> => {
    try {
      // Your async operation here
      const response = await fetch(`http://localhost:5001/cafes/:id/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const data = await response.json();
      dispatch({
        type: 'ADD_REVIEW_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'ADD_REVIEW_FAILURE',
        payload: error,
      });
    }
  };
};

const CafeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch(); // This should provide the correct dispatch type for thunks
  const reviews = useSelector((state: RootState) => state.reviews);

  const handleReviewSubmit = async (newReview: Review) => {
    // Assuming postReview correctly handles the review submission and updates the state
    dispatch(postReview(newReview)).then(() => {
      // Optionally, fetch updated reviews here or handle through redux state update
    }).catch(error => {
      console.error('Failed to submit review:', error);
    });
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/cafes/${id}`);
        if (!response.ok) {
          throw new Error('Cafe not found');
        }
        const data: Cafe = await response.json();
        setCafe(data);
        setError(null);
      } catch (err) {
        setError('An unknown error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchReviews(id));  // Correctly calling with id
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log('Reviews from state:', reviews);
  }, [reviews]);
  
  if (loading) return <div>Loading cafe details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cafe) return <div>Cafe not found.</div>;

  const mapLocation = {
    lat: cafe.location.coordinates[1],
    lng: cafe.location.coordinates[0],
  };

  const navigateToReviewForm = () => {
    navigate(`/cafes/${id}/review/new`);
  };

  if (loading) return <div>Loading cafe details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cafe) return <div>Cafe not found.</div>;

  const placeholderReviews = [
    { user: "Jane Doe", comment: "Great place, love the coffee!" },
    { user: "John Smith", comment: "Friendly staff and cozy atmosphere." },
  ];


  return (
    <CafeContainer>
      <CafeHeader>
        <CafeName>{cafe.name}</CafeName>
        {cafe.rating && <Rating>{cafe.rating} ({cafe.reviewsCount} reviews)</Rating>}
        <Address>{cafe.address}</Address>
        <Phone>{cafe.phone}</Phone>

      </CafeHeader>
        <CafeImage src={`http://localhost:5001${cafe.photo}`} alt={cafe.name} />
        <Description>{cafe.description}</Description>
        <h4>운영시간: {cafe.hours}</h4>
        <Menu>  
        <h3>Menu</h3>
        {cafe.menuHighlights.map((highlight, index) => (
          <MenuItem key={index}>{highlight}</MenuItem>
        ))}
        </Menu>
        <Map location={mapLocation} />
        <div>
        <ReviewsComponent _id={cafe._id}  />
      </div>

        <div>
        {reviews.reviews && reviews.reviews.length > 0 ? reviews.reviews.map((review: Review) => (
          <ReviewItem key={review.id}>
            <ReviewUserName>{review.user}</ReviewUserName>
            <ReviewRating>
              <StarRating rating={review.rating || 0} />
            </ReviewRating>
            <ReviewText>{review.comment}</ReviewText>
          </ReviewItem>
        )) : <p>No reviews yet.</p>}
      </div>
      <WriteReviewButton onClick={navigateToReviewForm}>Write a Review</WriteReviewButton>

      </CafeContainer>
    );
  };

export default CafeDetailPage;