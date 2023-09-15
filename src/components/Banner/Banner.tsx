import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
  EmblaEventType,
  UseEmblaCarouselType,
} from 'embla-carousel-react';
import useViewport from '../../hooks/useViewPort';
import styled from 'styled-components';
import Autoplay from 'embla-carousel-autoplay';
import BannerSlide from './BannerSlide';
import BannerSlideSkeleton from './BannerSlideSkeleton';
type PropType = {
  options?: EmblaOptionsType;
  slides: any[];
};
interface ButtonProps {
  onClickfunc: () => void;
  buttonStyle: CSSProperties;
  disabled?: boolean;
}
interface DotButtonProps extends ButtonProps {
  clicked: boolean;
  width: number;
}
const buttonStyle: CSSProperties = {
  zIndex: '1',
  WebkitAppearance: 'none',
  backgroundColor: 'transparent',
  touchAction: 'manipulation',
  display: 'inline-flex',
  textDecoration: 'none',
  cursor: 'pointer',
  border: '0',
  padding: '0',
  margin: '0',
};
let slideStyle: CSSProperties = {
  flex: '0 0 100%',
  overflow: 'hidden',
};

export const Banner = (props: PropType) => {
  const { options, slides } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ stopOnInteraction: false }),
  ]);

  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const { width, isMobile } = useViewport();

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi],
  );
  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevButtonDisabled(!emblaApi.canScrollPrev());
    setNextButtonDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="embla" ref={emblaRef} style={{ overflow: 'hidden' }}>
      <div className="embla__container" style={{ display: 'flex' }}>
        {slides ? (
          <>
            {slides.map((slide, index) => (
              <div
                className="embla__slide"
                style={{
                  ...slideStyle,
                  height: `${isMobile ? width * 0.9 : width * 0.36}px`,
                }}
                key={index}
              >
                <BannerSlide
                  buttonText={slide.buttonText}
                  desc={slide.desc}
                  image={slide.image}
                  name={slide.name}
                  onClick={slide.onClick}
                  title={slide.title}
                  key={index}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              className="embla__slide"
              style={{ ...slideStyle, height: `${width * 0.36}px` }}
            >
              <BannerSlideSkeleton />
            </div>
          </>
        )}
      </div>
      <StButtonContainer $carouselheight={width * 0.36}>
        <PrevButton
          onClickfunc={scrollPrev}
          buttonStyle={buttonStyle}
          disabled={prevButtonDisabled}
        />
        <NextButton
          onClickfunc={scrollNext}
          buttonStyle={buttonStyle}
          disabled={nextButtonDisabled}
        />
      </StButtonContainer>
      <StDotContainer $carouselheight={width * 0.36}>
        {scrollSnaps.map((__, index) => (
          <DotButton
            onClickfunc={() => {
              scrollTo(index);
            }}
            width={width}
            clicked={selectedIndex === index}
            buttonStyle={{ ...buttonStyle }}
          />
        ))}
      </StDotContainer>
    </div>
  );
};
const PrevButton = (props: ButtonProps) => {
  return (
    <button onClick={props.onClickfunc} style={{ ...props.buttonStyle }}>
      <img src="images/prev.svg" alt="prev" />
    </button>
  );
};
const NextButton = (props: ButtonProps) => {
  return (
    <button onClick={props.onClickfunc} style={{ ...props.buttonStyle }}>
      <img src="/images/next.svg" alt="next" />
    </button>
  );
};
const DotButton = (props: DotButtonProps) => {
  return (
    <button
      onClick={props.onClickfunc}
      style={{
        ...props.buttonStyle,
        ...{ paddingLeft: '8px', paddingRight: '8px' },
      }}
    >
      <img
        style={{ height: `max(6px, ${15 * (props.width / 1920)}px)` }}
        src={props.clicked ? '/images/dot.svg' : '/images/dotDeactivated.svg'}
        alt="dot"
      />
    </button>
  );
};
const StButtonContainer = styled.div<{
  $carouselheight: number;
}>`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  bottom: ${(props) => props.$carouselheight / 2 + 30}px;
  @media (max-width: 768px) {
    visibility: hidden;
  }
`;
const StDotContainer = styled.div<{ $carouselheight: number }>`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  bottom: 80px;
`;
export default Banner;
