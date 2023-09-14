import styled from 'styled-components';

export const S = {
  ReplyContainer: styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    border-bottom: 2px solid #d9d9d9;
    background-color: #ffffff;
    width: 90%;
    min-height: 150px;
    margin-left: 10%;
  `,

  CommentInfo: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  `,

  Profile: styled.div`
    display: flex;
    margin-top: 12px;
  `,

  Ninkname: styled.div`
    margin-left: 5px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    @media (max-width: 1024px) {
      font-size: 14px;
    }
  `,

  Award: styled.img`
    display: flex;
    width: 172px;
    height: 36px;
    padding: 8px 12px;
    align-items: center;
    border-radius: 999px;
    font-size: 14px;
    margin-top: 16px;
    @media (max-width: 1024px) {
      width: 135px;
      height: 28.3px;
    }
    @media (max-width: 768px) {
      width: 120px;
      height: 22.32px;
    }
  `,

  AwardNo: styled.div`
    display: flex;
    height: 32px;
    width: 172px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 999px;
    background: #f4f4f4;
    margin-left: 10px;
    font-size: 14px;
    margin-top: 20px;
    border: 1px solid #dbdbdb;
    @media (max-width: 1024px) {
      width: 135px;
      height: 28.3px;
    }
    @media (max-width: 768px) {
      width: 120px;
      height: 22.32px;
    }
  `,

  CommentDate: styled.div`
    color: #6e6c69;
    font-size: 12px;
    float: right;
    margin-right: 15px;
    display: flex;
    align-items: flex-end;
  `,

  ButtonBox: styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 5px;
  `,

  Button: styled.button`
    background-color: white;
    color: black;
    border: 1px solid #c88fff;
    border-radius: 6px;
    width: 64px;
    height: 28px;
    padding: 0px 8px;
    gap: 2px;
    margin-right: 5px;
    cursor: pointer;

    &:hover {
      background-color: #ffebf7;
      border: 1px solid #ff96db;
    }
  `,

  EditInput: styled.textarea`
    display: flex;
    border: 1px solid #566270;
    width: 80%;
    height: 25px;
    padding: 20px;
    margin: 5px 0px 50px 80px;
    resize: none;
    border-radius: 20px;
    border: 1px solid #d9d9d9;
    outline: none;
    resize: none;
    line-height: 1.6;
    font-size: 16px;
    @media (max-width: 768px) {
      width: 63%;
    }
  `,

  CommentBox: styled.div`
    width: 80%;
    min-height: 30px;
    line-height: 1.6;
    margin-left: 80px;
    word-wrap: break-word;
    white-space: pre-wrap;
    @media (max-width: 768px) {
      margin-left: 32px;
    }
  `,

  CommentMore: styled.button`
    background-color: #ffffff;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    width: 97px;
    height: 28px;
    cursor: pointer;
    margin-top: 12px;
    margin-bottom: 5px;
    display: block;
  `,

  MobieDate: styled.div`
    color: #999999;
    font-size: 12px;
    margin-top: 5px;
  `,

  ReplyingContainer: styled.div`
    width: 90%;
    margin-left: 10%;
    height: auto;
    border: 1px solid #c88fff;
    background-color: #f9f3ff;
    border-radius: 10px;
    align-items: center;
    flex-direction: row;
    margin-top: 15px;
  `,

  WriteInput: styled.textarea`
    display: flex;
    margin-top: 10px;
    border-radius: 10px;
    background-color: #f9f3ff;
    width: 87%;
    height: 48px;
    padding: 20px;
    border: none;
    outline: none;
    flex-grow: 1;
    resize: none;
    line-height: 1.6;
    font-size: 16px;
  `,

  ReplyButton: styled.button`
    background-color: #ff96db;
    border: none;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    width: 80px;
    height: 40px;
    font-size: 15px;
    margin-bottom: 10px;
    margin-right: 10px;
    float: right;
  `,
};
