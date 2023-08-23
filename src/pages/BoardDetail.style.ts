import styled from "styled-components";

const S = {
  Layout: styled.div`
    max-width: 1200px;
    min-width: 800px;
    margin: 0 auto;
    padding: 0 auto;
  `,

  FormContainer: styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
  `,

  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  InputContainer: styled.div`
    max-width: 1200px;
    width: 800px;
    margin: 10px;
  `,

  Label: styled.div`
    font-size: 15px;
    padding: 0 0 10px 5px;
  `,

  Select: styled.select`
    width: 798px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    border: 1px #ffffff solid;
  `,

  Input: styled.input`
    max-width: 1200px;
    width: 780px;
    padding: 10px;
    outline: none;
    border-radius: 8px;
    border: 1px #ffffff; solid;
  
  `,

  Textarea: styled.textarea`
    max-width: 1200px;
    width: 780px;
    height: 400px;
    padding: 10px;
    font-size: 14px;
    border: 1px #ffffff solid;
    outline: none;
    border-radius: 8px;
  `,

  Tag: styled.span`
    color: #ffffff;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 3px 10px 3px 10px;
  `,

  TagContainer: styled.div`
    display: inline-block;
    flex-wrap: wrap;
    padding: 10px 5px 10px 5px;
  `,

  ButtonContainer: styled.div`
    max-width: 1200px;
    width: 200px;
    margin: 10px;
    display: flex;
    justify-content: center;
  `,
  Button: styled.button`
    color: #red;
  `,
};

export { S };
