import styled from "styled-components";

const S = {
  Layout: styled.div`
    max-width: 1200px;
    min-width: 800px;
    margin: 0 auto;
    padding: 0 auto;
  `,

  ButtonContainer: styled.div`
    display: flex;
    justify-content: right;
  `,

  PostContainer: styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    border-top: 2px #red solid;
    border-bottom: 2px #red solid;
    margin: 20px;
    padding: 40px;
  `,

  Category: styled.div`
    font-size: 20px;
    max-width: 1200px;
    width: 800px;
    margin-left: 5px;
    padding: 0 auto;
  `,

  Name: styled.div`
    color: #red;
    font-size: 16px;
    max-width: 1200px;
    width: 800px;
    margin-bottom: 50px;
    padding: 0 auto;
  `,

  Info: styled.div`
    font-size: 16px;
    max-width: 1200px;
    width: 800px;
    text-align: right;
    padding: 0 auto;
  `,

  Box: styled.div`
    max-width: 1200px;
    width: 800px;
    margin: 20px;
    padding: 0 auto;
  `,

  Title: styled.div`
    line-height: 1.5;
    max-width: 1200px;
    width: 800px;
    margin-top: 20px;
    padding: 0 auto;
    font-size: 28px;
    font-weight: bold;
  `,

  Content: styled.div`
    white-space: pre-wrap;
    font-size: 18px;
    line-height: 1.5;
    max-width: 1200px;
    width: 800px;
    margin: 20px;
    padding: 0 auto;
  `,

  Tag: styled.span`
    color:  #red 
    background-color:  #blue;
    border-radius: 8px;
    padding: 3px 10px 3px 10px;
    margin-right: 5px;
  `,

  TagContainer: styled.div`
    display: inline-block;
    flex-wrap: wrap;
    padding: 10px 5px 10px 5px;
  `,

  Input: styled.input`
    max-width: 1200px;
    width: 780px;
    margin-top: 20px;
    padding: 10px;
    outline: none;
    border-radius: 8px;
    border: 1px #red solid;
    &::placeholder {
      color: #red;
    }
  `,

  Textarea: styled.textarea`
    max-width: 1200px;
    width: 800px;
    height: 200px;

    line-height: 1.5;
    font-size: 14px;
    border: 1px #red solid;
    outline: none;
    border-radius: 8px;
    &::placeholder {
      color: #red;
    }
  `,
};

export { S };
