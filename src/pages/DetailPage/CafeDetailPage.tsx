import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
// import { fetchCafeDetails } from '../api'; // Assume this is an API call function
import Map from '../../components/Map'; // Assume this is a component for displaying maps
import Reviews from '../../components/Reviews'; // Assume this is a component for displaying reviews
import ReviewForm from './ReviewForm';
import StarRating from './StarRating';
import { useSelector, useDispatch } from 'react-redux';
import { addReview as addReviewAction } from '../../redux/actions'; // Adjust import paths as necessary
import { RootState } from '../../redux/store';
import { Dispatch } from 'redux';
import {thunk} from 'redux-thunk';
import { Action } from 'redux'; // Import necessary types

export interface Cafe {
  _id: string; // Add this line
  name: string;
  photo: string;
  rating?: number;
  reviewsCount?: number;
  address?: string;
  phone?: string;
  description: string; // 카페 설명
  hours: string[];
  menuHighlights: string[]; // 메뉴 하이라이트
  location: { // Add this to reflect your data structure
    address: string;
    coordinates: [number, number]; // Assuming [lng, lat] format
  };
}

interface Review {
  id?: string; // Optional if you're setting it only after adding a review
  user: string;
  comment: string;
  cafeId: string;
  rating?: number; // 별점 정보 추가

}


const CafeContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const CafeHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const CafeName = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const Rating = styled.span`
  background-color: #ffdd57;
  color: #333;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

const Address = styled.p`
  color: #666;
`;

const Phone = styled.p`
  color: #666;
`;

const ReviewItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
`;

const ReviewUserName = styled.h4`
  margin: 0;
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

const ReviewText = styled.p`
  color: #666;
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Menu = styled.div`
  margin-bottom: 20px;
`;

const MenuItem = styled.div`
  margin-bottom: 10px;
`;

const CafeImage = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;

// Assuming you have an interface for your action and state
interface ReviewAction {
  type: string;
  payload?: any;
}

export const addReview = (newReview: Review) => {
  return async (dispatch: Dispatch<ReviewAction>): Promise<void> => {
    try {
      // Your async operation here
      const response = await fetch('your-api-endpoint', {
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
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const dispatch: Dispatch<any> = useDispatch();
  const reviews = useSelector((state: RootState) => state.reviews) || [];

  const handleReviewSubmit = (newReview: Review) => {
    dispatch(addReviewAction(newReview));
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 백엔드 API 주소 확인 및 수정
        const response = await fetch(`http://localhost:5001/cafes/${id}`);
        if (!response.ok) throw new Error('Cafe not found');
        const data: Cafe = await response.json();
        setCafe(data);
        setError(null);
      } catch (err) {
        setError('An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading cafe details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cafe) return <div>Cafe not found.</div>;

  const placeholderReviews = [
    { user: "Jane Doe", comment: "Great place, love the coffee!" },
    { user: "John Smith", comment: "Friendly staff and cozy atmosphere." },
  ];

  const mapLocation = {
    lat: cafe.location.coordinates[1],
    lng: cafe.location.coordinates[0],
  };

  return (
    <CafeContainer>
      <CafeHeader>
        <CafeName>{cafe.name}</CafeName>
        {cafe.rating && <Rating>{cafe.rating} ({cafe.reviewsCount} reviews)</Rating>}
        <Address>{cafe.address}</Address>
        <Phone>{cafe.phone}</Phone>

      </CafeHeader>
      <CafeImage src={cafe.photo} alt={cafe.name} />
      <p>{cafe.description}</p>
        <p>{cafe.hours}</p>
        <Menu>
        <h3>Menu Highlights</h3>
        {cafe.menuHighlights.map((highlight, index) => (
          <MenuItem key={index}>{highlight}</MenuItem>
        ))}
        </Menu>
        <Map location={mapLocation} />
        {reviews.map((review: Review) => (
        <ReviewItem key={review.id}>
          <ReviewUserName>{review.user}</ReviewUserName>
          <ReviewRating>
            <StarRating rating={review.rating || 0} setRating={() => {}} />
          </ReviewRating>
          <ReviewText>{review.comment}</ReviewText>
        </ReviewItem>
      ))}
        <ReviewForm cafeId={cafe._id} onSubmit={handleReviewSubmit} />

      </CafeContainer>
    );
  };

export default CafeDetailPage;