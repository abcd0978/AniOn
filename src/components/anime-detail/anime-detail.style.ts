import styled from "styled-components";

export const S = {
  DetailContainer: styled.div`
    margin-top: 20px;
  `,

  ContentsContainer: styled.div`
    display: flex;
    gap: 30px;
    @media screen and (max-width: 775px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `,

  ContentsImg: styled.div`
    img {
      width: 300px;
      height: 400px;
    }
  `,

  ContentsText: styled.p`
    line-height: 17px;
    margin-top: 20px;
  `,

  // ContentVideoLayout: styled.div`
  //   width:50px
  //   height: 50px
  // `,
};

//반응형예시
// @media screen and (max-width: 600px) {
//   flex-direction: column;
//   align-items: flex-end;
// }
