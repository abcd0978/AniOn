import styled from 'styled-components';

export const S = {
  noteTopBox: styled.div`
    border: 1px solid gray;
    border-right: none;
    border-left: none;
    border-bottom: none;
    display: flex;
    flex-direction: row;
    background-color: #f2f0f0;
    height: 40px;
    display: flex;
    align-items: center;
    margin-top: 20px;
  `,

  noteBox: styled.div`
    border: 1px solid gray;
    border-right: none;
    border-left: none;
    border-top: none;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 40px;
  `,
  nickname: styled.div`
    width: 15%;
    margin-left: 13px;

    @media (max-width: 768px) {
      width: 25%;
    }
  `,
  title: styled.div`
    width: 72%;
  `,
  date: styled.div`
    width: 13%;

    @media (max-width: 768px) {
      width: 33%;
      margin-left: 5px;
      margin-right: 8px;
    }
  `,
  Content: styled.div<{ expanded: boolean }>`
    background-color: #f2f0f0;
    width: calc(100% - 40px);
    max-height: ${(props) => (props.expanded ? '1000px' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease;
    padding: 20px;
    padding-bottom: 35px;
    font-size: 15px;
  `,
  ContentInner: styled.div`
    color: #696764;
    margin-top: 5px;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 20px;
  `,
  Page: styled.div`
    display: flex;
    justify-content: center;
  `,
  deleteButton: styled.button`
    border-radius: 6px;
    border: 1px solid var(--main-mid-2, #c88fff);
    background: #fdfbff;
    width: auto;
    height: 28px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    float: right;
    margin-top: 10px;
    &:hover {
      background-color: #c88fff;
      color: white;
    }
  `,
};
