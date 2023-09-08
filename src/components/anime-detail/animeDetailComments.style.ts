import styled from 'styled-components';

export const S = {
  AniCommentContainer: styled.div`
    margin-top: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #fdfbff; */
  `,

  AniCommentBox: styled.div`
    width: 1440px;
    min-height: 218px;
    border-bottom: 2px solid #d9d9d9;
    position: relative;
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

  AniAwardNo: styled.div`
    display: flex;
    height: 32px;
    width: 172px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 999px;
    background: #f4f4f4;
    font-size: 14px;
    border: 1px solid #dbdbdb;
  `,

  AniCommentText: styled.div`
    width: 1380px;
    min-height: 48px;
    padding: 0px, 0px, 0px, 60px;
    margin-top: 23px;
    margin-left: 80px;
    // max-width: 1380px;
    max-width: 100%;
    word-wrap: break-word;
    white-space: pre-wrap;
    /* overflow: hidden; //우선 걸어놓음 더 길게 쓰면 더보기 추가해야함 */
    line-height: 1.6;
  `,

  AniCommentInputBox: styled.div`
    width: 1440px;
    height: 148px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    border: 1px solid #c88fff;
    background-color: #f9f3ff;
  `,

  AniCommentInput: styled.textarea`
    width: 1317px;
    height: 50px;
    padding: 20px;
    border: none;
    outline: none;
    background-color: #f9f3ff;
    margin-top: 5px;
    border-radius: 10px;
    resize: none;
    line-height: 1.6;
    font-size: 16px;
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
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 5px;
  `,

  AniEditCommentInput: styled.textarea`
    width: 1277px;
    height: 25px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    margin: 10px 0px 0px 80px;
    resize: none;
    outline: none;
    line-height: 1.6;
    font-size: 16px;
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
  CommentMore: styled.button`
    background-color: #ffffff;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    width: 97px;
    height: 28px;
    cursor: pointer;
    margin-left: 78px;
    display: block;
    margin-bottom: 5px;
    margin-top: 13px;
  `,
};
