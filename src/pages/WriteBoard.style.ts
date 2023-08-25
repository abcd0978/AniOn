import styled from 'styled-components';

const S = {
  Layout: styled.div`
    max-width: 1200px;
    min-width: 800px;
    margin: 0 auto;
    padding: 0 auto;
    box-shadow: 5px 5px 5px 5px #0000001a;
    margin-top: 25px;
  `,

  Form: styled.form`
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
    display: flex;
  `,

  Label: styled.div`
    font-size: 15px;
    height: 18px;
    width: 100px;
    margin-left: 20px;
  `,
  LabelContent: styled.div`
    font-size: 15px;
    height: 18px;
    width: 100px;
    margin-left: 20px;
  `,

  Select: styled.select`
    width: 200px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    border: 1px #f5f5f5 solid;
  `,

  Input: styled.input`
    max-width: 1200px;
    width: 500px;
    padding: 10px;
    outline: none;
    border-radius: 8px;
    background-color: #f5f5f5;
    border: none;
  `,

  Textarea: styled.textarea`
    max-width: 1200px;
    width: 500px;
    height: 300px;
    padding: 10px;
    font-size: 14px;
    background-color: #f5f5f5;
    border: none;
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
    background-color: #757575;
    border: none;
    width: 62px;
    height: 28px;
    font-size: 13px;
    color: white;
    margin-right: 5px;
  `,
};

export { S };
