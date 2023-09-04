import styled from 'styled-components';

export const Outer = styled.div`
  width: 1360px;
  margin: 0 auto;
  padding: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 18px;
  margin-bottom: 80px;
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
  width: 1360px;
  height: auto;
  border: 1px solid #c88fff;
  background-color: #f9f3ff;
  border-radius: 10px;
  align-items: center;
  flex-direction: row;
`;

export const CommentTitle = styled.div`
  color: #8200ff;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 10px;
`;
export const CommentBot = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2px;
`;

export const WriteInput = styled.input`
  display: flex;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background-color: #f9f3ff;
  width: 1277px;
  height: 48px;
  padding: 20px;
  border: none;
  outline: none;
  flex-grow: 1;
`;

export const WriteButton = styled.button`
  background-color: #ff96db;
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
`;

export const ButtonBox = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 5px;
`;

export const button = styled.button`
  background-color: #efefef;
  color: black;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  width: 50px;
  height: 25px;
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
  width: 1360px;
  max-height: 300px;
`;

export const CommentDate = styled.div`
  font-size: 12px;
  color: #807b85;
  margin-bottom: 33px;
  margin-top: -36px;
  float: right;
`;
export const EditInput = styled.input`
  display: flex;
  border: 1px solid #566270;
  width: 80%;
  height: 30px;
  margin-top: 5px;
  border-radius: 5px;
`;

export const profile = styled.div`
  display: flex;
  margin-top: 12px;
`;
export const Img = styled.img`
  width: 48px;
  height: 48px;
`;
export const Ninkname = styled.div`
  margin-left: 5px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
`;
export const Award = styled.div`
  display: flex;
  // width: 172px;
  height: 36px;
  padding: 8px 12px;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  background: #f4f4f4;
  margin-left: 10px;
  font-size: 14px;
`;
export const CommentBox = styled.div`
  width: 1308px;
  height: 48px;
  margin-left: 55px;
  line-height: 1.6;
`;
export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
