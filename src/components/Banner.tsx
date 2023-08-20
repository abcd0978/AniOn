import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
  EmblaEventType,
  UseEmblaCarouselType,
} from "embla-carousel-react";
import next from "../assets/next.svg";
import prev from "../assets/prev.svg";
import dot from "../assets/dot.svg";
import dotDeactivated from "../assets/dotDeactivated.svg";
import styled from "styled-components";
type PropType = {
  options?: EmblaOptionsType;
  slides: ReactNode[];
};
interface ButtonProps {
  onClickfunc: () => void;
  buttonStyle: CSSProperties;
  disabled?: boolean;
}
interface DotButtonProps extends ButtonProps {
  clicked: boolean;
}
const buttonStyle: CSSProperties = {
  zIndex: "1",
  WebkitAppearance: "none",
  backgroundColor: "transparent",
  touchAction: "manipulation",
  display: "inline-flex",
  textDecoration: "none",
  cursor: "pointer",
  border: "0",
  padding: "0",
  margin: "0",
};
const slideStyle: CSSProperties = {
  height: "300px",
  backgroundColor: "#D9D9D9",
  border: "solid 1px",
  flex: "0 0 100%",
};

export const Banner = (props: PropType) => {
  const { options, slides } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
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
    [emblaApi]
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
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container" style={{ display: "flex" }}>
        {slides.map((slide, index) => (
          <div className="embla__slide" style={slideStyle} key={index}>
            {slide}
          </div>
        ))}
      </div>
      <StButtonContainer carouselHeight={300}>
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
      <StDotContainer carouselHeight={300}>
        {scrollSnaps.map((__, index) => (
          <DotButton
            onClickfunc={() => {
              scrollTo(index);
            }}
            clicked={selectedIndex === index}
            buttonStyle={buttonStyle}
          />
        ))}
      </StDotContainer>
    </div>
  );
};
const PrevButton = (props: ButtonProps) => {
  return (
    <button onClick={props.onClickfunc} style={props.buttonStyle}>
      <img src={prev} alt="prev" />
    </button>
  );
};
const NextButton = (props: ButtonProps) => {
  return (
    <button onClick={props.onClickfunc} style={props.buttonStyle}>
      <img src={next} alt="next" />
    </button>
  );
};
const DotButton = (props: DotButtonProps) => {
  return (
    <button
      onClick={props.onClickfunc}
      style={{
        ...props.buttonStyle,
        ...{ paddingLeft: "6px", paddingRight: "6px" },
      }}
    >
      <img src={props.clicked ? dot : dotDeactivated} alt="dot" />
    </button>
  );
};
const StButtonContainer = styled.div<{ carouselHeight: number }>`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  bottom: ${(props) => props.carouselHeight / 2 + 30}px;
`;
const StDotContainer = styled.div<{ carouselHeight: number }>`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  bottom: ${(props) => props.carouselHeight / 2 - 80}px;
`;
export default Banner;
