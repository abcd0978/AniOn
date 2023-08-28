import styled from 'styled-components';

export const Outer = styled.div`
  width: 1360px;
  margin: 0 auto;
  padding: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 18px;
`;
export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  height: auto;
  border-radius: 30px;
`;

export const CommentTop = styled.div`
  width: 1317px;
  height: auto;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  align-items: center;
  flex-direction: row;
`;

export const CommentBot = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
`;

export const WriteInput = styled.input`
  display: flex;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  width: 1277px;
  height: 48px;
  padding: 20px;
  border: none;
  outline: none;
  flex-grow: 1;
`;

export const WriteButton = styled.button`
  background-color: #757575;
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
  &:hover {
    background-color: rgb(0, 0, 0, 0.5);
    color: rgb(255, 255, 255, 100);
    font-weight: bold;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 5px;
`;

export const button = styled.button`
  background-color: #dddddd;
  color: black;
  border: none;
  border-radius: 10px;
  width: 50px;
  height: 30px;
  margin-right: 5px;
  cursor: pointer;
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-bottom: 2px solid #d9d9d9;
  margin-top: 28px;
  background-color: #ffffff;
  width: 1277px;
  height: 153px;
`;

export const CommentDate = styled.div`
  font-size: 12px;
  color: #807b85;
  margin-bottom: 5px;
  float: right;
`;
export const EditInput = styled.input`
  display: flex;
  border: 1px solid #566270;
  width: 75%;
  height: 25px;
  margin-top: 5px;
  border-radius: 5px;
`;

export const profile = styled.div`
  display: flex;
`;
export const Img = styled.img`
  width: 48px;
  height: 48px;
`;
export const Ninkname = styled.div`
  margin-left: 5px;
  display: flex;
  align-items: center;
`;
