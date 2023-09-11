import styled from 'styled-components';

const S = {
  Container: styled.div`
    width: 1440px;
    border-radius: 20px;
    box-shadow: 0px 0px 20px 0px #0000001a;
    gap: 20px;
    padding: 40px;
    margin-top: 20px;
    margin-bottom: 100px;
  `,
  Inner: styled.div`
    width: 1360px;
    display: block;
    align-items: center;
    justify-content: center;
  `,
  Top: styled.div`
    width: 1360px;
    min-height: 45px;
    padding: 12px, 0px, 12px, 0px;
    gap: 16px;
    margin-top: 20px;
  `,

  ButtonContainer: styled.div`
    display: flex;
    justify-content: right;
    margin-top: -30px;
    margin-right: -60px;
  `,
  Button: styled.button`
    background-color: #dddddd;
    color: black;
    border: none;
    width: 50px;
    height: 30px;
    border-radius: 10px;
    margin-right: 5px;
    cursor: pointer;
  `,

  PostContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 1360px;
    margin-bottom: 50px;
    margin-top: -5px;
  `,

  Category: styled.div`
    font-size: 16px;
    width: 800px;
    margin-left: 17px;
    color: gray;
  `,

  Date: styled.div`
    font-size: 16px;
    width: 1360px;
    text-align: right;
    float: right;
    color: gray;
    margin-right: -60px;
    margin-bottom: 10px;
  `,

  Box: styled.div`
    width: 1360px;
    margin: 20px;
    padding: 0 auto;
  `,
  EditBox: styled.div`
    width: 1360px;
    height: 500px;
    margin: 20px;
    padding: 0 auto;
  `,

  Title: styled.div`
    line-height: 1.5;
    width: 1184px;
    height: 21px;
    padding: 0 auto;
    font-size: 24px;
    font-weight: bold;
    line-height: 36px;
    // margin: -5px;
    margin-top: -10px;
    margin-left: 12px;
  `,

  Content: styled.div`
    white-space: wrap;
    // word-wrap: break-word;
    // font-size: 16px;
    line-height: 1.6;
    width: 1360px;
    margin: 20px;
    gap: 40px;

    h1 {
      display: block;

      font-size: 2em;

      margin-top: 0.67em;

      margin-bottom: 0.67em;

      margin-left: 0;

      margin-right: 0;

      font-weight: bold;
    }

    h2 {
      display: block;

      font-size: 1.5em;

      margin-top: 0.83em;

      margin-bottom: 0.83em;

      margin-left: 0;

      margin-right: 0;

      font-weight: bold;
    }

    h3 {
      display: block;

      font-size: 1.17em;

      margin-top: 1em;

      margin-bottom: 1em;

      margin-left: 0;

      margin-right: 0;

      font-weight: bold;
    }

    h4 {
      display: block;

      font-size: 1em;

      margin-top: 1.33em;

      margin-bottom: 1.33em;

      margin-left: 0;

      margin-right: 0;

      font-weight: bold;
    }

    h5 {
      display: block;

      font-size: 0.83em;

      margin-top: 1.67em;

      margin-bottom: 1.67em;

      margin-left: 0;

      margin-right: 0;

      font-weight: bold;
    }

    h6 {
      display: block;

      font-size: 0.67em;

      margin-top: 2.33em;

      margin-bottom: 2.33em;

      margin-left: 0;

      margin-right: 0;

      font-weight: bold;
    }
    p {
      margin: 10px 0;
      padding: 5px;
      word-wrap: break-word;
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,

  Select: styled.select`
    width: 200px;
    height: 44px;
    outline: none;
    border-radius: 8px;
    border: none;
    background-color: #f9f3ff;
    box-shadow: 5px 5px 5px 5px #0000001a;
    margin-top: -150px;
    &:hover {
      border: 1px solid #c88fff;
    }
  `,
  Input: styled.input`
    width: calc(90% - 5px);
    height: 44px;
    outline: none;
    border: none;
    box-shadow: 5px 5px 5px 5px #0000001a;
    background-color: #f9f3ff;
    border-radius: 8px;
    &:hover {
      border: 1px solid #c88fff;
    }
  `,

  Textarea: styled.textarea`
    width: 1360px;
    height: 450px;
    max-height: 4355px;
    line-height: 1.5;
    font-size: 16px;
    outline: none;
    border-radius: 8px;
    border: none;
    box-shadow: 5px 5px 5px 5px #0000001a;
    background-color: #f9f3ff;
  `,
  ImgProfile: styled.img`
    width: 60px;
    height: 60px;
    border-radius: 999px;
  `,
  User: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  UserInfo: styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 13px;
  `,

  Nickname: styled.div`
    white-space: nowrap;
    display: flex;
    /* align-items: center; */
    justify-content: center;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 5px;
  `,
  Like: styled.div`
    background-color: white;
    cursor: pointer;
    display: flex;
    height: 40px;
    justify-content: flex-end;
    padding: 10px;
    margin-right: -15px;
  `,
  Img: styled.img`
    background-color: white;
    cursor: pointer;
    display: flex;
  `,

  TopTitle: styled.div`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 30px;
    margin-left: 5px;
    color: #8200ff;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  `,

  Post: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Search: styled.div`
    display: flex;
  `,

  Write: styled.div`
    display: flex;
  `,

  WriteButton: styled.button`
    background-color: #8200ff;
    border: none;
    border-radius: 10px;
    width: 120px;
    height: 40px;
    padding: 8px;
    font-size: 15px;
    color: white;
    cursor: pointer;
    margin-right: -70px;
  `,

  CateButton: styled.button`
    border: none;
    width: 100px;
    height: 36px;
    font-size: 13px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 3px;
    font-size: 13px;
    border-radius: 999px;
    font-weight: bold;
    cursor: pointer;
  `,

  ListButton: styled.button`
    width: 80px;
    height: 40px;
    font-size: 15px;
    background-color: #dddddd;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    margin-left: 60px;
  `,
  Line: styled.div`
    border: 1px solid #d9d9d9;
    width: 1440px;
    margin-top: 20px;
  `,

  Award: styled.div`
    display: flex;
    height: 36px;
    padding: 8px 12px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 999px;
    background: #f4f4f4;

    font-size: 14px;
    margin-top: 5px;
  `,
  Comment: styled.div`
    width: 1360px;
    max-height: 2476px;
    gap: 20px;
    margin-bottom: -150px;
    margin-left: 30px;
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
    font-size: 14px;
    border: 1px solid #dbdbdb;
  `,
};

export { S };
