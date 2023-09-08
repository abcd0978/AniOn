import React from 'react';
import { S } from './styled.NotFoundPage';
import NotFound from '../../assets/404.svg';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <S.NotFoundContainer>
      <S.NotFoundImg src={NotFound} alt={NotFound} />
      <S.NotFoundContents>
        <S.NotFoundTitle>페이지를 찾을 수 없습니다.</S.NotFoundTitle>
        <S.NotFoundBodys>
          <S.NotFoundBody>
            페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다.
          </S.NotFoundBody>
          <S.NotFoundBody>
            입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
          </S.NotFoundBody>
        </S.NotFoundBodys>
        <S.NotFoundButtons>
          <S.NotFoundButton onClick={() => navigate(-1)}>
            이전 페이지로
          </S.NotFoundButton>
          <S.NotFoundButton onClick={() => navigate('/')}>
            메인 페이지로
          </S.NotFoundButton>
        </S.NotFoundButtons>
      </S.NotFoundContents>
    </S.NotFoundContainer>
  );
};

export default NotFoundPage;
