import styled from "styled-components";

const S = {
  MainPostsContainer: styled.div`
    margin: 0px auto;
    padding: 30px;
    border-radius: 5px;
  `,
  PostsBoxContainer: styled.div`
    display: grid;
  `,
  title: styled.div`
    margin-left: 20px;
    font-size: 18px;
  `,
  PostBox: styled.div`
    margin: 13px;
    font-size: 18px;
    border: 1px solid ${(props) => props.theme.mainPaletteColor2};
    border-radius: 5px;
    flex-direction: column;
    // 넘치는 text 처리
    overflow: hidden;
    height: 150px;
    transition: all 0.2s ease-in-out;

    border-radius: 10px;
    &:hover {
      cursor: pointer;
      transform: scale(1.01);
      box-shadow: 5px 5px 13px rgba(154, 154, 154, 0.4);
    }
  `,
  PostBoxNav: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 13px;
    background-color: ${(props) => props.theme.mainNavyColor};
    color: ${(props) => props.theme.whiteColor};
  `,
  PostContentBox: styled.div`
    margin: 10px;
    font-size: 17px;
    letter-spacing: 1px;
    line-height: 25px;
    padding: 15px;
    max-height: 25%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 표시할 줄 수 설정 */
    -webkit-box-orient: vertical; /* 텍스트의 방향 설정 */
  `,
  Outer: styled.div`
    max-width: 1200px;
    min-width: 800px;
    margin: 0 auto;
    padding: 0 auto;
  `,
  Nickname: styled.div`
    font-size: 14px;
  `,
  box: styled.div`
    margin-bottom: 28px;
  `,
};

export { S };
