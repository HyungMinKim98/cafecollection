import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCafe } from '../../redux/cafeSlice';
import { fetchReviews } from '../../redux/reviewSlice';
import { RootState } from '../../redux/store';
import Map from '../../components/Map';
import ReviewsComponent from '../ReviewPage/ReviewsComponent';
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
  WriteReviewButton
} from './CafeDetailPageStyles';

const CafeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cafe = useSelector((state: RootState) => state.cafe.cafe);
  const loading = useSelector((state: RootState) => state.cafe.loading);
  const error = useSelector((state: RootState) => state.cafe.error);
  const reviews = useSelector((state: RootState) => state.reviews.reviews);

  useEffect(() => {
    if (id) {
      dispatch(fetchCafe(id) as any); // 타입 캐스팅을 통해 any를 사용
      dispatch(fetchReviews(id) as any);
    }
  }, [id, dispatch]);


  const navigateToReviewForm = () => {
    navigate(`/cafes/${id}/review/new`);
  };

  if (loading) return <div>Loading cafe details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cafe) return <div>Cafe not found.</div>;

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
      <CafeImage src={`http://localhost:5001${cafe.photo}`} alt={cafe.name} />
      <Description>{cafe.description}</Description>
      <h4>운영시간: {cafe.hours}</h4>
      <Menu>
        <h3>메뉴</h3>
        {cafe.menuHighlights.map((highlight, index) => (
          <MenuItem key={index}>{highlight}</MenuItem>
        ))}
      </Menu>
      <Map location={mapLocation} />
      <div>
        <ReviewsComponent _id={cafe._id} reviews={reviews} />
      </div>
      <WriteReviewButton onClick={navigateToReviewForm}>리뷰 작성</WriteReviewButton>
    </CafeContainer>
  );
};

export default CafeDetailPage;