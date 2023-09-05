import styled from 'styled-components';

export const S = {
  AniCommentContainer: styled.div`
    margin-top: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fdfbff;
  `,

  AniCommentBox: styled.div`
    width: 1440px;
    height: 205px;
    border-bottom: 2px solid #d9d9d9;
  `,

  AniCommentUser: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 12px;
  `,

  AniCommentUp: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  `,

  AniProfileImg: styled.img`
    width: 48px;
    height: 48px;
  `,

  AniUserNickname: styled.div`
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.24px;
  `,

  AniUserAward: styled.div`
    display: flex;
    // width: 172px;
    height: 36px;
    padding: 8px 12px;
    align-items: center;
    gap: 8px;
    border-radius: 999px;
    /* background: #f4f4f4; */
  `,

  AniCommentText: styled.div`
    width: 1380px;
    height: 48px;
    padding: 0px, 0px, 0px, 60px;
    margin-top: 23px;
    margin-left: 60px;
    // max-width: 1380px;
    max-width: 100%;
  `,

  AniCommentInputBox: styled.div`
    width: 1440px;
    height: 148px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    border: 1px solid #c88fff;
    background-color: #f9f3ff;
  `,

  AniCommentInput: styled.input`
    width: 1317px;
    height: 50px;
    padding: 20px;
    border: none;
    outline: none;
    background-color: #f9f3ff;
    margin-top: 5px;
    border-radius: 10px;
  `,
  AniCommentInputButton: styled.button`
    border-radius: 10px;
    background-color: #ffa8dc;
    color: white;
    cursor: pointer;
    width: 80px;
    height: 40px;
    padding: 4px 14px;
    font-size: 15px;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    display: flex;
    float: right;
    margin-right: 15px;
    margin-bottom: 12px;
    border: none;
  `,

  AniCommentButton: styled.button`
    width: 64px;
    height: 28px;
    padding: 0px 8px;
    justify-content: center;
    align-items: center;
    gap: 2px;
    border-radius: 6px;
    border: 1px solid #c88fff;
    margin-right: 8px;
    background-color: white;
    cursor: pointer;

    &:hover {
      border: 1.6px solid #ff96db;
      background-color: #ffebf7;
    }
  `,

  AniCommentButtonBox: styled.div`
    float: right;
    margin-top: 10px;
  `,

  AniEditCommentInput: styled.input`
    width: 1277px;
    height: 25px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    margin: 10px 0px 0px 60px;
    resize: none;
  `,

  AniCommentPageBox: styled.div`
    text-align: center;
    margin-top: 20px;
  `,
  CommentSpace: styled.div`
    margin-top: 50px;
  `,
  Outer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  date: styled.div`
    color: #6e6c69;
    font-size: 12px;
  `,
};
