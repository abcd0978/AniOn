import styled from 'styled-components';

export const S = {
  AniCommentContainer: styled.div`
    margin-top: 32px;
  `,

  AniCommentBox: styled.div`
    width: 1376px;
    height: 153px;
    border-bottom: 2px solid #d9d9d9;
  `,

  AniCommentUser: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
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

  AniCommentText: styled.div`
    width: 1376px;
    height: 48px;
    padding: 0px, 0px, 0px, 60px;
    margin-top: 8px;
    margin-left: 60px;
  `,

  AniCommentInputBox: styled.div`
    margin-top: 12px;
    position: relative;
  `,

  AniCommentInput: styled.input`
    width: 1277px;
    height: 108px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    display: inline;
    outline: none;
  `,
  AniCommentInputButton: styled.button`
    border-radius: 10px;
    background: #757575;
    color: white;
    cursor: pointer;
    width: 80px;
    height: 40px;
    padding: 4px 14px;
    font-size: 15px;
    font-weight: 400;
    position: absolute;
  `,

  AniCommentButton: styled.button`
    width: 64px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    padding: 0px, 8px, 0px, 8px;
  `,

  AniCommentButtonBox: styled.div`
    margin-left: 60px;
  `,

  AniEditCommentInput: styled.input`
    width: 1277px;
    height: 25px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    margin: 10px 0px 0px 60px;
  `,

  AniCommentPageBox: styled.div`
    text-align: center;
    margin-top: 20px;
  `,
};
