import styled from 'styled-components';

type Props = {
  $isOpen: boolean;
};

export const S = {
  MobileFilterSection: styled.section<Props>`
    position: fixed;
    left: 0;
    bottom: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
    width: 100%;
    height: 55%;
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    transition: all 0.3s ease-out;
    z-index: 999;
  `,

  MobileFilterBackdrop: styled.div<Props>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    z-index: 5;
  `,

  CategolyClose: styled.div`
    height: 2%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    cursor: pointer;
  `,

  MobileFilterContainer: styled.div`
    gap: 12px;
    height: 70%;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `,

  FilterText: styled.span``,

  FilterOptionContainer: styled.div`
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px 20px 20px;
  `,

  FilterResetContainer: styled.div`
    width: 30%;
    display: flex;
    font-size: 12px;
    align-items: center;
    cursor: pointer;
  `,

  DoneButton: styled.button`
    width: 65%;
    border: none;
    padding: 4px 12px;
    color: #ffffff;
    background: #8200ff;
    border-radius: 999px;
    height: 36px;
    font-size: 15px;
    cursor: pointer;
  `,
};
