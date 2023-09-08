import { styled } from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onClick: (page: string | number) => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

export const PaginationTwo = ({
  currentPage,
  totalPages,
  onClick,
  isPreviousDisabled,
  isNextDisabled,
}: PaginationProps) => {
  return (
    <PaginationContainer>
      <Button disabled={isPreviousDisabled} onClick={() => onClick('prev')}>
        {'<'}
      </Button>
      <Current>{currentPage}</Current>
      <Total>/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{totalPages}</Total>
      <Button disabled={isNextDisabled} onClick={() => onClick('next')}>
        {'>'}
      </Button>
    </PaginationContainer>
  );
};
const Button = styled.button`
  border-radius: 4px;
  border: 1px solid var(--main-light-2, #f3e7ff);
  background: #fff;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;
const Current = styled.div`
  color: #191919;
`;
const Total = styled.div`
  color: #767676;
`;
const PaginationContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;
