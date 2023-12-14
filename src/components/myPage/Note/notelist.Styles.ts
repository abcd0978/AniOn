import styled from 'styled-components';

export const S = {
  Container: styled.div`
    border-radius: 20px;
    box-shadow: 0px 0px 20px 0px #0000001a;
    gap: 20px;
    padding: 40px;
    margin-top: 20px;
    margin-bottom: 100px;
    height: 600px;
  `,
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
  `,
  title: styled.div`
    width: 72%;
  `,
  date: styled.div`
    width: 13%;
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
    line-height: 17px;
  `,
};
