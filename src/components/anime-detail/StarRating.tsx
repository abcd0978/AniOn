// 별점 컴포넌트

import React from 'react';
import star_variant from '../../assets/star_variant.svg';
import no_star from '../../assets/no_star.svg';
import styled from 'styled-components';

type StarRatingProps = {
  rating: number;
  maxRating: number;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating }) => {
  const filledStars = Math.floor(rating); // 채워진 별의 개수
  const emptyStars = maxRating - filledStars; // 비워진 별의 개수

  const starIcons = Array.from({ length: maxRating }, (_, index) => {
    if (index < filledStars) {
      return <img src={star_variant} />; // 채워진 별
    } else {
      return <img src={no_star} />; // 비워진 별
    }
  });

  return (
    <div style={{ width: '192px', height: '32px' }}>
      {starIcons.map((icon, index) => (
        <RealStar key={index}>{icon}</RealStar>
      ))}
    </div>
  );
};

export default StarRating;

const RealStar = styled.span`
  margin-left: 5px;
  width: 192px;
`;
