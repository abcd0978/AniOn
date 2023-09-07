import React, {
  ReactNode,
  CSSProperties,
  useCallback,
  useState,
  useEffect,
} from 'react';
import Banner from '../components/Banner';
import styled from 'styled-components';
import next from '../assets/next.svg';
import prev from '../assets/prev.svg';
import MainCard from '../components/MainCard';
import useViewport from '../hooks/useViewPort';
import { getAnimeRankings } from '../api/laftel';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import MainCardSkeleton from '../components/MainCardSkeleton';
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
  EmblaEventType,
  UseEmblaCarouselType,
} from 'embla-carousel-react';
import hosino from '../assets/hosihoii.jpg';
import gil from '../assets/gil.jpg';
import cha from '../assets/cha.jpg';
import jusul from '../assets/jusulgg.png';
import ScrollToTop from '../components/ScrollToTop';
// const BannerSlide: ReactNode[] = ['슬라이드1', '슬라이드2', '슬라이드3'];
const smallCardHeight = 272;
const BigCardHeight = 464;
interface ButtonProps {
  onClickfunc: () => void;
  buttonStyle: CSSProperties;
  disabled: boolean;
}
const buttonStyle: CSSProperties = {
  zIndex: '1',
  background: 'rgba(0,0,0,0)',
  WebkitAppearance: 'none',
  backgroundColor: 'transparent',
  touchAction: 'manipulation',
  textDecoration: 'none',
  cursor: 'pointer',
  border: '0',
  padding: '0',
  margin: '0',
};

const Main = () => {
  const navigate = useNavigate();
  const { width } = useViewport();
  const [nextButtonDisabledW, setNextButtonDisabledW] =
    useState<boolean>(false);
  const [prevButtonDisabledW, setPrevButtonDisabledW] =
    useState<boolean>(false);
  const [nextButtonDisabledN, setNextButtonDisabledN] =
    useState<boolean>(false);
  const [prevButtonDisabledN, setPrevButtonDisabledN] =
    useState<boolean>(false);

  const [weeklyEmblaRef, weeklyEmblaApi] = useEmblaCarousel(
    { slidesToScroll: 'auto', containScroll: 'trimSnaps' },
    [],
  );
  const [newEmblaRef, newEmblaApi] = useEmblaCarousel(
    { slidesToScroll: 'auto', containScroll: 'trimSnaps' },
    [],
  );
  const scrollPrevW = useCallback(
    (emblaApi: EmblaCarouselType | undefined) => {
      if (emblaApi) {
        emblaApi.scrollPrev();
      }
    },
    [weeklyEmblaApi],
  );

  const scrollNextW = useCallback(
    (emblaApi: EmblaCarouselType | undefined) => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    },
    [weeklyEmblaApi],
  );

  const scrollPrevN = useCallback(
    (emblaApi: EmblaCarouselType | undefined) => {
      if (emblaApi) {
        emblaApi.scrollPrev();
      }
    },
    [newEmblaApi],
  );

  const scrollNextN = useCallback(
    (emblaApi: EmblaCarouselType | undefined) => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    },
    [newEmblaApi],
  );
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

  const onSelectN = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevButtonDisabledN(!emblaApi.canScrollPrev());
    setNextButtonDisabledN(!emblaApi.canScrollNext());
  }, []);
  const onSelectW = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevButtonDisabledW(!emblaApi.canScrollPrev());
    setNextButtonDisabledW(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!newEmblaApi || !weeklyEmblaApi) return;
    onSelectN(newEmblaApi!);
    onSelectW(weeklyEmblaApi!);
    newEmblaApi!.on('select', onSelectN);
    weeklyEmblaApi!.on('select', onSelectW);
  }, [newEmblaApi, weeklyEmblaApi, onSelectN, onSelectW]);

  const bannerInfo = [
    {
      image: hosino,
      name: '애니-온',
      title: '이상형 월드컵',
      desc: '나만의 이상형을 애니에서 만나볼 수 있다고?',
      buttonText: '테스트하기',
      onClick: () => navigate('/worldcup'),
    },
    {
      image: jusul,
      name: '애니-온',
      title: '주술회전 1기 part 1',
      desc: '마법으로 펼쳐지는 모험, 화끈한 주문 대결의 시작',
      buttonText: '알아보기',
      onClick: () => navigate('/recommend/39986'),
    },
    {
      image: gil,
      name: '애니-온',
      title: '길모퉁이 마족',
      desc: '화끈한 마법세계 속, 귀엽고 야심찬 마족들의 독특한 모험!',
      buttonText: '알아보기',
      onClick: () => navigate('/recommend/39524'),
    },
    {
      image: cha,
      name: '애니-온',
      title: '체인소 맨',
      desc: '악마와 맞서는 데빌 헌터들을 만날 시간',
      buttonText: '알아보기',
      onClick: () => navigate('/recommend/41105'),
    },
  ];

  return (
    <>
      <Banner options={{ loop: true, duration: 20 }} slides={bannerInfo} />
      <StMainCardContainerContainer>
        <StMainCardContainerWithTypo>
          <div>
            <p
              style={{ display: 'inline', ...boldFontStyle, color: '#8200FF' }}
            >
              종합
            </p>
            <p
              style={{
                display: 'inline',
                ...RegularFontStyle,
                color: '#8200FF',
              }}
            >
              순위
            </p>
          </div>
          <StMainCardContainer $mediawidth={width}>
            {dataH ? (
              <>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/recommend/${dataH[0].id}`)}
                >
                  <MainCard
                    key={dataH[0].id + 132}
                    index={1}
                    data={dataH[0]}
                    width={BigCardHeight}
                  />
                </div>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/recommend/${dataH[1].id}`)}
                >
                  <MainCard
                    key={dataH[1].id + 133}
                    index={2}
                    data={dataH[1]}
                    width={BigCardHeight}
                  />
                </div>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/recommend/${dataH[2].id}`)}
                >
                  <MainCard
                    key={dataH[2].id + 134}
                    index={3}
                    data={dataH[2]}
                    width={BigCardHeight}
                  />
                </div>
              </>
            ) : (
              <>
                <MainCardSkeleton width={BigCardHeight} />
                <MainCardSkeleton width={BigCardHeight} />
                <MainCardSkeleton width={BigCardHeight} />
              </>
            )}
          </StMainCardContainer>
        </StMainCardContainerWithTypo>
      </StMainCardContainerContainer>
      <StMainCardContainerContainer>
        <StMainCardContainerWithTypo>
          <div>
            <p
              style={{ display: 'inline', ...boldFontStyle, color: '#8200FF' }}
            >
              이번주
            </p>
            <p
              style={{
                display: 'inline',
                ...RegularFontStyle,
                color: '#8200FF',
              }}
            >
              순위
            </p>
          </div>
          <StMainCardContainer
            $mediawidth={width}
            style={{ alignContent: 'center' }}
          >
            <div
              className="embla"
              style={{ maxWidth: `${width * 0.75}px` }}
              ref={weeklyEmblaRef}
            >
              <div
                className="embla__container"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '16px',
                }}
              >
                {dataW ? (
                  dataW.map((data, index) => {
                    return (
                      <div
                        onClick={() => navigate(`/recommend/${data.id}`)}
                        key={data.id + 2}
                        className="embla__slide"
                        style={{ cursor: 'pointer' }}
                      >
                        <MainCard
                          key={data.id + 1}
                          index={index + 1}
                          data={data}
                          width={smallCardHeight}
                        />
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                  </>
                )}
              </div>
              <StButtonContainer
                $mediawidth={width * 0.75}
                $carouselheight={smallCardHeight}
              >
                <PrevButton
                  onClickfunc={() => scrollPrevW(weeklyEmblaApi)}
                  buttonStyle={buttonStyle}
                  disabled={prevButtonDisabledW}
                />
                <NextButton
                  onClickfunc={() => scrollNextW(weeklyEmblaApi)}
                  buttonStyle={buttonStyle}
                  disabled={nextButtonDisabledW}
                />
              </StButtonContainer>
            </div>
          </StMainCardContainer>
        </StMainCardContainerWithTypo>
      </StMainCardContainerContainer>
      <StMainCardContainerContainer>
        <StMainCardContainerWithTypo>
          <div>
            <p
              style={{ display: 'inline', ...boldFontStyle, color: '#8200FF' }}
            >
              신작
            </p>
            <p
              style={{
                display: 'inline',
                ...RegularFontStyle,
                color: '#8200FF',
              }}
            >
              순위
            </p>
          </div>
          <StMainCardContainer
            $mediawidth={width}
            style={{ alignContent: 'center' }}
          >
            <div
              className="embla"
              style={{ maxWidth: `${width * 0.75}px` }}
              ref={newEmblaRef}
            >
              <div
                className="embla__container"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '16px',
                }}
              >
                {dataQ ? (
                  dataQ.map((data, index) => {
                    return (
                      <div
                        onClick={() => navigate(`/recommend/${data.id}`)}
                        key={data.id + 3}
                        className="embla__slide"
                        style={{ cursor: 'pointer' }}
                      >
                        <MainCard
                          key={data.id + 4}
                          index={index + 1}
                          data={data}
                          width={smallCardHeight}
                        />
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardHeight} />
                    </div>
                  </>
                )}
              </div>
              <StButtonContainer
                $mediawidth={width * 0.75}
                $carouselheight={smallCardHeight}
              >
                <PrevButton
                  onClickfunc={() => scrollPrevN(newEmblaApi)}
                  buttonStyle={buttonStyle}
                  disabled={prevButtonDisabledN}
                />
                <NextButton
                  onClickfunc={() => scrollNextN(newEmblaApi)}
                  buttonStyle={buttonStyle}
                  disabled={nextButtonDisabledN}
                />
              </StButtonContainer>
            </div>
          </StMainCardContainer>
        </StMainCardContainerWithTypo>
      </StMainCardContainerContainer>
      <ScrollToTop />
    </>
  );
};

// const Stfooter = styled.div`
//   width: 100%;
//   height: 200px;
//   background-color: #f9f3ff;
//   display: flex;
//   flex-direction: row;
// `;

const backgroundR: CSSProperties = {
  background: 'linear-gradient( 90deg, rgba(0, 0, 0, 0) 10%,#000 100%  )',
};
const backgroundL: CSSProperties = {
  background: 'linear-gradient( 90deg, #000 10%, rgba(0, 0, 0, 0) 100%  )',
};

const PrevButton = (props: ButtonProps) => {
  const { disabled, buttonStyle, onClickfunc } = props;
  const visibilty: CSSProperties = disabled ? { visibility: 'hidden' } : {};
  return (
    <button onClick={onClickfunc} style={{ ...buttonStyle, ...visibilty }}>
      <img src={prev} alt="prev" />
    </button>
  );
};
const NextButton = (props: ButtonProps) => {
  const { disabled, buttonStyle, onClickfunc } = props;
  const visibilty: CSSProperties = disabled ? { visibility: 'hidden' } : {};
  return (
    <button onClick={onClickfunc} style={{ ...buttonStyle, ...visibilty }}>
      <img src={next} alt="next" />
    </button>
  );
};
const StButtonContainer = styled.div<{
  $carouselheight: number;
  $mediawidth: number;
}>`
  width: ${(props) => props.$mediawidth}px;
  display: flex;
  position: relative;
  justify-content: space-between;
  bottom: ${(props) => props.$carouselheight / 2 + 30}px;
`;
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
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
`;
const StMainCardContainer = styled.div<{ $mediawidth: number }>`
  //width: ${(props) => props.$mediawidth * 0.75}px;
  width: ${(props) => props.$mediawidth}px;
  display: flex;
  gap: 14px;
  flex-direction: row;
`;

export default Main;
