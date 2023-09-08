import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StarRatings = (rating: any) => {
  const avrRate = rating.rating * 20;
  const starIdxArr = ['first', 'second', 'third', 'fourth', 'last'];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);

  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (avrRate * 165) / 100;
    let idx = 0;
    while (starVerScore > 33) {
      tempStarRatesArr[idx] = 33;
      idx += 1;
      starVerScore -= 33;
    }
    tempStarRatesArr[idx] = starVerScore;

    return tempStarRatesArr;
  };

  useEffect(() => {
    setRatesResArr(calcStarRates);
  }, [rating]);

  // console.log(rating);
  // console.log('별점:', calcStarRates());

  return (
    <StarRateWrap>
      {starIdxArr.map((item, idx) => {
        return (
          <span className="star_icon" key={`${item}_${idx}`}>
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <clipPath id={`${item}StarClip`}>
                <rect width={`${ratesResArr[idx]}`} height="32" />
              </clipPath>
              <path
                id={`${item}Star`}
                d="M19.0848 1.65474L21.9496 7.81006C22.2217 8.38562 22.7659 8.8013 23.3901 8.89723L30.064 9.92045C32.3687 10.2722 33.313 13.102 31.6805 14.7808L26.703 19.9128C26.2869 20.3445 26.0949 20.968 26.1909 21.5596L27.3432 28.6422C27.7274 31.0084 25.2306 32.7831 23.134 31.6319L17.4203 28.4504C16.8441 28.1306 16.1559 28.1306 15.5797 28.4504L9.86602 31.6319C7.7694 32.799 5.27265 31.0244 5.65677 28.6422L6.80911 21.5596C6.90514 20.9521 6.71308 20.3445 6.29696 19.9128L1.31947 14.7808C-0.313014 13.102 0.631267 10.2722 2.93595 9.92045L9.60995 8.89723C10.2341 8.8013 10.7783 8.40161 11.0504 7.81006L13.9152 1.65474C14.9395 -0.55158 18.0605 -0.55158 19.1008 1.65474H19.0848Z"
                // fill="#FF96DB"
                transform="translate(-0.2 -0.3)"
              />
              <use
                clipPath={`url(#${item}StarClip)`}
                href={`#${item}Star`}
                fill="#FF96DB"
              />
            </svg>
          </span>
        );
      })}
    </StarRateWrap>
  );
};

export default StarRatings;

const StarRateWrap = styled.div`
  width: 192px;
  height: 32px;
  display: flex;
  align-items: center;
  width: 100%;
  .star_icon {
    display: inline-flex;
    margin-right: 5px;
  }
`;
