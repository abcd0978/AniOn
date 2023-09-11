import React, { CSSProperties, useCallback, useState, useEffect } from 'react';
import Banner from '../components/Banner';
import styled from 'styled-components';
import next from '../assets/next.svg';
import prev from '../assets/prev.svg';
import MainCard from '../components/MainCard';
import useViewport from '../hooks/useViewPort';
import { fetchAnimeRecommend, getAnimeRankings } from '../api/laftel';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import MainCardSkeleton from '../components/MainCardSkeleton';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import hosino from '../assets/hosihoii.jpg';
import gil from '../assets/gil.jpg';
import cha from '../assets/cha.jpg';
import jusul from '../assets/jusulgg.png';
import ScrollToTop from '../components/ScrollToTop';

const smallCardWidth = 272;
const BigCardWidth = 464;

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
  const { width, isMobile } = useViewport();

  const [nextButtonDisabledW, setNextButtonDisabledW] =
    useState<boolean>(false);
  const [prevButtonDisabledW, setPrevButtonDisabledW] =
    useState<boolean>(false);
  const [nextButtonDisabledN, setNextButtonDisabledN] =
    useState<boolean>(false);
  const [prevButtonDisabledN, setPrevButtonDisabledN] =
    useState<boolean>(false);
  const [nextButtonDisabledR, setNextButtonDisabledR] =
    useState<boolean>(false);
  const [prevButtonDisabledR, setPrevButtonDisabledR] =
    useState<boolean>(false);

  const [weeklyEmblaRef, weeklyEmblaApi] = useEmblaCarousel(
    { slidesToScroll: 'auto', containScroll: 'trimSnaps' },
    [],
  );

  const [newEmblaRef, newEmblaApi] = useEmblaCarousel(
    { slidesToScroll: 'auto', containScroll: 'trimSnaps' },
    [],
  );

  const [historyEmblaRef, historyEmblaApi] = useEmblaCarousel(
    { active: false },
    [],
  );

  const [recommendEmblaRef, recommendEmblaApi] = useEmblaCarousel(
    { slidesToScroll: 'auto', containScroll: 'trimSnaps' },
    [],
  );

  useEffect(() => {
    if (isMobile) {
      weeklyEmblaApi?.reInit({ dragFree: true });
      newEmblaApi?.reInit({ dragFree: true });
      historyEmblaApi?.reInit({ active: true, dragFree: true });
      recommendEmblaApi?.reInit({ active: true, dragFree: true });
    }
  }, [
    isMobile,
    weeklyEmblaApi,
    newEmblaApi,
    historyEmblaApi,
    recommendEmblaApi,
  ]);

  const scrollPrevW = useCallback((emblaApi: EmblaCarouselType | undefined) => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, []);

  const scrollNextW = useCallback((emblaApi: EmblaCarouselType | undefined) => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, []);

  const scrollPrevN = useCallback((emblaApi: EmblaCarouselType | undefined) => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, []);

  const scrollNextN = useCallback((emblaApi: EmblaCarouselType | undefined) => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, []);

  const scrollPrevR = useCallback((emblaApi: EmblaCarouselType | undefined) => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, []);

  const scrollNextR = useCallback((emblaApi: EmblaCarouselType | undefined) => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, []);

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

  const recommendQueryOption = {
    queryKey: ['animeRecommend'],
    queryFn: () => fetchAnimeRecommend(),
    refetchOnWindowFocus: false,
    staleTile: 60 * 60,
  };

  const { data: dataH } = useQuery(historyQueryOption);
  const { data: dataQ } = useQuery(quarterQueryOption);
  const { data: dataW } = useQuery(weeklyQueryOption);
  const { data: dataR } = useQuery(recommendQueryOption);

  const onSelectN = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevButtonDisabledN(!emblaApi.canScrollPrev());
    setNextButtonDisabledN(!emblaApi.canScrollNext());
  }, []);

  const onSelectW = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevButtonDisabledW(!emblaApi.canScrollPrev());
    setNextButtonDisabledW(!emblaApi.canScrollNext());
  }, []);

  const onSelectR = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevButtonDisabledR(!emblaApi.canScrollPrev());
    setNextButtonDisabledR(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!newEmblaApi || !weeklyEmblaApi) return;

    onSelectN(newEmblaApi!);
    onSelectW(weeklyEmblaApi!);
    onSelectR(recommendEmblaApi!);

    newEmblaApi!.on('select', onSelectN);
    weeklyEmblaApi!.on('select', onSelectW);
    recommendEmblaApi!.on('select', onSelectR);
  }, [
    newEmblaApi,
    weeklyEmblaApi,
    recommendEmblaApi,
    onSelectN,
    onSelectW,
    onSelectR,
  ]);

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
              style={{
                display: 'inline',
                ...boldFontStyle,
                color: '#8200FF',
                fontSize: `${isMobile ? 20 : (32 * width) / 1920}px`,
              }}
            >
              종합
            </p>
            <p
              style={{
                display: 'inline',
                ...RegularFontStyle,
                color: '#8200FF',
                fontSize: `${isMobile ? 20 : (32 * width) / 1920}px`,
              }}
            >
              순위
            </p>
          </div>
          <StMainCardContainer $mediawidth={width}>
            <div
              className="embla middle"
              style={{ maxWidth: `${isMobile ? width * 0.9 : width * 0.75}px` }}
              ref={historyEmblaRef}
            >
              <div
                className="embla__container"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '16px',
                }}
              >
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
                        width={BigCardWidth}
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
                        width={BigCardWidth}
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
                        width={BigCardWidth}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <MainCardSkeleton width={BigCardWidth} />
                    <MainCardSkeleton width={BigCardWidth} />
                    <MainCardSkeleton width={BigCardWidth} />
                  </>
                )}
              </div>
            </div>
          </StMainCardContainer>
        </StMainCardContainerWithTypo>
      </StMainCardContainerContainer>
      <StMainCardContainerContainer>
        <StMainCardContainerWithTypo>
          <div>
            <p
              style={{
                display: 'inline',
                ...boldFontStyle,
                color: '#8200FF',
                fontSize: `${isMobile ? 20 : (32 * width) / 1920}px`,
              }}
            >
              이번주
            </p>
            <p
              style={{
                display: 'inline',
                ...RegularFontStyle,
                color: '#8200FF',
                fontSize: `${isMobile ? 20 : (32 * width) / 1920}px`,
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
              className="embla middle"
              style={{ maxWidth: `${isMobile ? width * 0.9 : width * 0.75}px` }}
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
                          width={smallCardWidth}
                        />
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                  </>
                )}
              </div>
              <StButtonContainer
                IsMobile={isMobile}
                $mediawidth={width * 0.75}
                $carouselheight={smallCardWidth}
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
              style={{
                display: 'inline',
                ...boldFontStyle,
                color: '#8200FF',
                fontSize: `${isMobile ? 20 : (32 * width) / 1920}px`,
              }}
            >
              신작
            </p>
            <p
              style={{
                display: 'inline',
                ...RegularFontStyle,
                color: '#8200FF',
                fontSize: `${isMobile ? 20 : (32 * width) / 1920}px`,
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
              className="embla middle"
              style={{ maxWidth: `${isMobile ? width * 0.9 : width * 0.75}px` }}
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
                          width={smallCardWidth}
                        />
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                  </>
                )}
              </div>
              <StButtonContainer
                IsMobile={isMobile}
                $mediawidth={width * 0.75}
                $carouselheight={smallCardWidth}
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
      <StMainCardContainerContainer>
        <StMainCardContainerWithTypo>
          <div>
            <p
              style={{
                display: 'inline',
                ...boldFontStyle,
                color: '#8200FF',
                fontSize: `${isMobile ? 20 : (32 * width) / 1920}px`,
              }}
            >
              {dataR && dataR[0].name}
            </p>
          </div>
          <StMainCardContainer
            $mediawidth={width}
            style={{ alignContent: 'center' }}
          >
            <div
              className="embla middle"
              style={{ maxWidth: `${isMobile ? width * 0.9 : width * 0.75}px` }}
              ref={recommendEmblaRef}
            >
              <div
                className="embla__container"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '16px',
                }}
              >
                {dataR ? (
                  dataR[0].item_list.map((data: any, index: number) => {
                    return (
                      <div
                        onClick={() => navigate(`/recommend/${data.id}`)}
                        key={Math.random()}
                        className="embla__slide"
                        style={{ cursor: 'pointer' }}
                      >
                        <MainCard
                          key={Math.random()}
                          index={index + 1}
                          data={data}
                          width={smallCardWidth}
                        />
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                    <div className="embla__slide">
                      <MainCardSkeleton width={smallCardWidth} />
                    </div>
                  </>
                )}
              </div>
              <StButtonContainer
                IsMobile={isMobile}
                $mediawidth={width * 0.75}
                $carouselheight={smallCardWidth}
              >
                <PrevButton
                  onClickfunc={() => scrollPrevR(recommendEmblaApi)}
                  buttonStyle={buttonStyle}
                  disabled={prevButtonDisabledR}
                />
                <NextButton
                  onClickfunc={() => scrollNextR(recommendEmblaApi)}
                  buttonStyle={buttonStyle}
                  disabled={nextButtonDisabledR}
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
  IsMobile: boolean;
}>`
  width: ${(props) => props.$mediawidth}px;
  display: ${(props) => (props.IsMobile ? 'none' : 'flex')};
  position: relative;
  justify-content: space-between;
  bottom: ${(props) => props.$carouselheight / 2 + 30}px;
`;

const boldFontStyle: CSSProperties = {
  color: '#000',
  fontFamily: 'Pretendard Variable',
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: 'normal',
  letterSpacing: '-0.48px',
};

const RegularFontStyle: CSSProperties = {
  color: '#000',
  fontFamily: 'Pretendard Variable',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
  letterSpacing: '-0.48px',
};

const StMainCardContainerContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 40px 0px;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

const StMainCardContainerWithTypo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
`;

const StMainCardContainer = styled.div<{ $mediawidth: number }>`
  width: 100%;
  display: flex;
  gap: 14px;
  flex-direction: row;
`;

export default Main;
