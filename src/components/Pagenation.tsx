import { styled } from 'styled-components';

export default function Pagination({
  currentPage,
  totalPages,
  onClick,
}: {
  currentPage: number;
  totalPages: number;
  onClick: (page: number | 'prev' | 'next') => void;
}) {
  return (
    <Container>
      <Before className="page-click" onClick={() => onClick('prev')}>
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
      <After className="page-click" onClick={() => onClick('next')}>
        {'다음 >'}
      </After>
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
`;
const After = styled.span`
  border: 1px solid;
  border-color: #f3e7ff;
  border-radius: 6px;
  padding: 10px;
  color: #767676;
  margin: 10px;
`;
const Number = styled.span`
  color: #767676;
`;
const Container = styled.div`
  margin: 30px;

  display: space-between;
`;
