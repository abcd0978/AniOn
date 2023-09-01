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
      <Before
        className={`page-click ${isPreviousDisabled ? 'disabled' : ''}`}
        onClick={() => {
          if (!isPreviousDisabled) {
            onClick('prev');
          }
        }}
        disabled={isPreviousDisabled}
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
                currentPage === idx + 1 ? 'active-page' : ''
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
              <Stdot style={{ marginLeft: 5, marginRight: 5 }}>...</Stdot>
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
    </Container>
  );
}

const Before = styled.button`
  border: 1px solid #f3e7ff;
  border-radius: 6px;
  padding: 10px;
  // color: #767676;
  margin: 10px;
  background-color: white;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-right: 18px;
  width: 60px;
  height: 40px;
  font-size: 14px;

  &:hover {
    border-color: ${(props) => (props.disabled ? '' : '#c88fff')};
    background-color: ${(props) => (props.disabled ? '' : '#f3e7ff')};
  }
`;

const After = styled.span`
  border: 1px solid #f3e7ff;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  width: 60px;
  height: 40px;
  font-size: 14px;

  &:hover {
    background-color: #f3e7ff;
    border-color: #c88fff;
  }
`;

const Stdot = styled.span`
  color: #767676;
`;

const Number = styled.span`
  color: #767676;
  margin-right: 20px;
  cursor: pointer;
  text-align: center;

  &.active-page {
    color: rgb(255, 150, 219);
    font-weight: bold;
  }
`;

const Container = styled.div`
  margin-top: 40px;
  margin-bottom: 55px;
  display: space-between;
`;

// const BeforeButton = styled.button`
//   border: 1px solid;
//   border-color: #f3e7ff;
//   border-radius: 6px;
//   padding: 10px;
//   color: #767676;
//   margin: 10px;
//   cursor: pointer;
//   margin-right: 18px;

//   &:disabled:hover {
//     cursor: not-allowed;
//   }

// &:hover {
//   background-color: #f3e7ff;
//   border-color: #c88fff;
// }
// `;
