import { styled } from 'styled-components';

export default function Pagination({
  currentPage,
  totalPages,
  onClick,
  isPreviousDisabled,
  isNextDisabled,
}: {
  currentPage: number;
  totalPages: number;
  onClick: (page: number | 'prev' | 'next') => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}) {
  return (
    <Container>
      <NumberBox>
        <Before
          className={`page-click ${isPreviousDisabled ? 'disabled' : ''}`}
          onClick={() => {
            if (!isPreviousDisabled) {
              onClick('prev');
            }
          }}
        >
          {'< 이전 '}
        </Before>
        {Array.from({ length: totalPages }).map((_, idx) => {
          if (
            idx === 0 ||
            idx === totalPages - 1 ||
            (idx >= currentPage - 2 && idx <= currentPage + 2)
          ) {
            return (
              <Number
                className={`page-click ${
                  currentPage === idx + 1 && 'active-page'
                }`}
                key={idx}
                onClick={() => onClick(idx + 1)}
              >
                {idx + 1}
              </Number>
            );
          } else if (idx === currentPage - 3 || idx === currentPage + 3) {
            return (
              <span key={idx}>
                <span style={{ marginLeft: 5, marginRight: 5 }}>...</span>
              </span>
            );
          }
          return null;
        })}
        <After
          className={`page-click ${isNextDisabled ? 'disabled' : ''}`}
          onClick={() => {
            if (!isNextDisabled) {
              onClick('next');
            }
          }}
        >
          {'다음 >'}
        </After>
      </NumberBox>
    </Container>
  );
}
const Before = styled.span`
  border: 1px solid;
  border-color: #f3e7ff;
  border-radius: 6px;
  padding: 10px;
  color: #767676;
  margin: 10px;
  cursor: pointer;
`;
const After = styled.span`
  border: 1px solid;
  border-color: #f3e7ff;
  border-radius: 6px;
  padding: 10px;
  color: #767676;
  margin: 10px;
  cursor: pointer;
`;

const Number = styled.span`
  color: #767676;
`;

const NumberBox = styled.div`
  gap: 10px;
`;
const Container = styled.div`
  margin-top: 40px;
  display: space-between;
`;
