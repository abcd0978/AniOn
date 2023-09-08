import styled from 'styled-components';

interface PostContentProps {
  hasImage: boolean;
}
export const Container = styled.div`
  // width: 1440px;
  // height: 2098px;
`;

export const Post = styled.div`
  width: 47%;
  min-height: 235px;
  max-height: 357px;
  border: 2px solid #c88fff;
  border-radius: 12px;
  display: inline-block;
  // margin-bottom: 20px;
  margin-right: 20px;
  margin-top: 30px;
  cursor: pointer;
  background-color: #fdfbff;
`;

export const PostTop = styled.div`
  width: 100%;
  height: 44px;
  border-bottom: 2px solid #c88fff;
  border-radius: 12px 12px 0 0;
  padding: 8px, 20px, 8px, 20px;
  background-color: #f3e7ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const PostTopLeft = styled.div`
  display: flex;
  margin-left: 15px;
  color: #4f4f4f;
`;
export const PostTopRight = styled.div`
  display: flex;
  margin-right: 15px;
  font-size: 15px;
`;
export const Ddabong = styled.img`
  margin-right: 2px;
  width: 14px;
  color: #4f4f4f;
  margin-right: 7px;
`;
export const PostMiddle = styled.div`
  width: 95%;
  height: 49px;
  gap: 12px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 19px;
`;
export const PostMiddleLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
`;
export const PostMiddleRight = styled.div`
  display: flex;
  color: #999999;
  font-size: 15px;
`;
export const Ninkname = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;
export const PostBottom = styled.div`
  width: 100%;
  // height: 220px;
  gap: 12px;
  margin-left: 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;
export const PostBottomLeft = styled.div`
  width: 45%;
  gap: 8px;
  display: flex;
  flex-direction: column;
`;
export const PostTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const PostContent = styled.div<PostContentProps>`
  font-size: 18px;
  width: ${(props) => (props.hasImage ? 'auto' : '640px')};
  height: 98px;
  margin-top: 10px;
  color: #4f4f4f;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
`;
export const PostBottomRight = styled.div`
  width: 45%;
  // height: 220px;
  border-radius: 20px;
  margin-left: 20px;
  margin-bottom: 10px;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 220px;
  border-radius: 20px;
`;

export const Category = styled.div`
  color: #4f4f4f;
  font-size: 15px;
  margin-left: 10px;
`;

export const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
  margin-left: 5px;
  color: #8200ff;
`;

export const Button = styled.button`
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
`;
export const WriteButton = styled.button`
  background-color: #8200ff;
  border: none;
  border-radius: 10px;
  width: 120px;
  height: 40px;
  padding: 8px;
  font-size: 15px;
  color: white;
  margin-left: 10px;
  cursor: pointer;
`;

export const Search = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Write = styled.div`
  // display: flex;
`;
export const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  margin-right: 60px;
`;

export const SearchInput = styled.input`
  width: 260px;
  height: 40px;
  border: 1px solid #cfcfcf;
  border-radius: 20px;
  padding-right: 30px;
  padding-left: 15px;
`;

export const SearchIcon = styled.img`
  position: absolute;
  top: 40%;
  right: 145px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
`;
export const Page = styled.div`
  justify-content: center;
  display: flex;
  // cursor: pointer;
`;
export const AwardNo = styled.div`
  display: flex;
  height: 26px;
  width: 140px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  background: #f4f4f4;
  color: black;
  font-size: 14px;
  margin-bottom: 5px;

  border: 1px solid #dbdbdb;
`;
