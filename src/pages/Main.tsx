import React, { ReactNode, CSSProperties } from 'react';
import Banner from '../components/Banner';
import styled from 'styled-components';
import MainCard from '../components/MainCard';
import useViewport from '../hooks/useViewPort';
import { getAnimeRankings } from '../api/laftel';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
  EmblaEventType,
  UseEmblaCarouselType,
} from 'embla-carousel-react';
const testNodes: ReactNode[] = ['슬라이드1', '슬라이드2', '슬라이드3'];

const Main = () => {
  const navigate = useNavigate();
  const { width } = useViewport();
  const [historyEmblaRef, historyEmblaApi] = useEmblaCarousel({}, []);
  const [weeklyEmblaRef, weeklyEmblaApi] = useEmblaCarousel({}, []);
  const [newEmblaRef, newEmblaApi] = useEmblaCarousel({}, []);
  const historyQueryOption = {
    queryKey: ['animeRankingHistory'],
    queryFn: () => getAnimeRankings('history'),
    refetchOnWindowFocus: false,
  };
  const quarterQueryOption = {
    queryKey: ['animeRankingQuarter'],
    queryFn: () => getAnimeRankings('quarter'),
    refetchOnWindowFocus: false,
  };
  const weeklyQueryOption = {
    queryKey: ['animeRankingWeek'],
    queryFn: () => getAnimeRankings('week'),
    refetchOnWindowFocus: false,
  };
  const {
    isLoading: isLoadingH,
    isError: isErrorH,
    isFetching: isFetchingH,
    data: dataH,
  } = useQuery(historyQueryOption);
  const {
    isLoading: isLoadingQ,
    isError: isErrorQ,
    isFetching: isFetchingQ,
    data: dataQ,
  } = useQuery(quarterQueryOption);
  const {
    isLoading: isLoadingW,
    isError: isErrorW,
    isFetching: isFetchingW,
    data: dataW,
  } = useQuery(weeklyQueryOption);
  return (
    <>
      <Banner options={{ loop: true, duration: 20 }} slides={testNodes} />
      <StMainCardContainerContainer>
        <StMainCardContainerWithTypo>
          <div>
            <p style={{ display: 'inline', ...boldFontStyle }}>종합</p>
            <p style={{ display: 'inline', ...RegularFontStyle }}>순위</p>
          </div>
          <StMainCardContainer mediaWidth={width}>
            {dataH ? (
              <>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/recommend/${dataH[0].id}`)}
                >
                  <MainCard index={1} data={dataH[0]} width={464} />
                </div>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/recommend/${dataH[1].id}`)}
                >
                  <MainCard index={2} data={dataH[1]} width={464} />
                </div>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/recommend/${dataH[2].id}`)}
                >
                  <MainCard index={3} data={dataH[2]} width={464} />
                </div>
              </>
            ) : (
              <></>
            )}
          </StMainCardContainer>
        </StMainCardContainerWithTypo>
      </StMainCardContainerContainer>
      <StMainCardContainerContainer>
        <StMainCardContainerWithTypo>
          <div>
            <p style={{ display: 'inline', ...boldFontStyle }}>이번주</p>
            <p style={{ display: 'inline', ...RegularFontStyle }}>순위</p>
          </div>
          <StMainCardContainer mediaWidth={width}>
            {dataW ? (
              <>
                {dataW.map((data, index) => {
                  return (
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/recommend/${data.id}`)}
                    >
                      <MainCard index={index + 1} data={data} width={272} />
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </StMainCardContainer>
        </StMainCardContainerWithTypo>
      </StMainCardContainerContainer>
      <StMainCardContainerContainer>
        <StMainCardContainerWithTypo>
          <div>
            <p style={{ display: 'inline', ...boldFontStyle }}>신작</p>
            <p style={{ display: 'inline', ...RegularFontStyle }}>순위</p>
          </div>
          <StMainCardContainer mediaWidth={width}>
            {dataQ ? (
              <>
                {dataQ.map((data, index) => {
                  return (
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/recommend/${data.id}`)}
                    >
                      <MainCard index={index + 1} data={data} width={272} />
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </StMainCardContainer>
        </StMainCardContainerWithTypo>
      </StMainCardContainerContainer>
    </>
  );
};
const boldFontStyle: CSSProperties = {
  color: '#000',
  fontFamily: 'Pretendard Variable',
  fontSize: '32px',
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: 'normal',
  letterSpacing: '-0.48px',
};
const RegularFontStyle: CSSProperties = {
  color: '#000',
  fontFamily: 'Pretendard Variable',
  fontSize: '32px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
  letterSpacing: '-0.48px',
};
const StMainCardContainerContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 50px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 100px;
`;
const StMainCardContainerWithTypo = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
`;
const StMainCardContainer = styled.div<{ mediaWidth: number }>`
  width: ${(props) => props.mediaWidth * 0.75}px;
  display: flex;
  overflow: hidden;
  gap: 14px;
  flex-direction: row;
`;

export default Main;
