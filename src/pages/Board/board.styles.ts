import styled from 'styled-components';

interface PostContentProps {
  hasImage?: boolean;
  $isFull?: boolean;
}
export const Container = styled.div`
  width: 100%;
`;
export const PostWrapper = styled.div`
  gap: 20px;
  display: grid;
  row-gap: 20px;
  margin-top: 40px;
  // 1025px부터 2줄로
  @media (min-width: 1025px) {
    grid-template-columns: repeat(2, minmax(50%, 1fr));
    .tall {
      grid-row: span 2;
    }
    .small {
      grid-row: span 1;
    }
  }
  @media (max-width: 1024px) {
    grid-template-columns: 1fr; /* 1024px 이하에서는 단일 열 레이아웃 */
  }
`;

export const Post = styled.div`
  min-width: 0;
  border: 2px solid #c88fff;
  border-radius: 12px;
  display: inline-block;
  cursor: pointer;
  background-color: #fdfbff;
  box-sizing: border-box;
`;

export const PostTop = styled.div`
  height: 28px;
  padding: 8px 20px;
  display: flex;
  align-items: center;
  background-color: #f3e7ff;
  border-radius: 12px 12px 0 0;
  justify-content: space-between;
  border-bottom: 2px solid #c88fff;
`;

export const PostTopLeft = styled.div`
  display: flex;
  color: #4f4f4f;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const PostTopRight = styled.div`
  display: flex;
  font-size: 15px;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const Ddabong = styled.img`
  margin-right: 5px;
  width: 14px;
  color: #4f4f4f;
`;

export const CommentsCount = styled.img`
  margin-right: 5px;
  width: 14px;
  color: #4f4f4f;
  margin-top: 3px;
`;

export const PostMiddle = styled.div`
  width: 95%;
  // 1920상태에서 gap 확인
  gap: 12px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;

  @media (max-width: 768px) {
    /* width: 100%; */
    /* gap: 2px;
    flex-direction: column;
    align-items: flex-start;
    padding: 5px; */
  }
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

  @media (max-width: 1280px) and (min-width: 1025px) {
    font-size: 14px;
  }
`;
export const Ninkname = styled.div`
  white-space: nowrap;
  margin-left: 10px;
  margin-right: 10px;
  @media (max-width: 768px) {
    margin: 0px 5px;
    font-size: 13px;
  }
`;
export const PostBottom = styled.div`
  gap: 12px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const PostBottomLeft = styled.div<PostContentProps>`
  width: ${(props) => (props.$isFull ? '95%' : '45%')};
  /* padding: 25px; */
  padding: 1em;
  gap: 8px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 95%;
    padding: 10px;
  }
`;

export const PostBottomRight = styled.div`
  padding: 8px 0px;
  width: 60%;
  padding: 0.5em;
  @media (max-width: 768px) {
    margin: auto;
    width: 90%;
  }
`;

export const Thumbnail = styled.img`
  width: 100%;
  object-fit: cover;
  margin: auto;
  border-radius: 20px;
`;

export const PostTitle = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 20px;
  font-weight: 700;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
  }
`;

export const PostContent = styled.div<PostContentProps>`
  font-size: 18px;
  margin-top: 10px;
  color: #4f4f4f;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  @media (max-width: 768px) {
    width: 99%;
    font-size: 15px;
  }
`;

export const StAwardImg = styled.img`
  width: 172px;
  height: 32px;
  @media (max-width: 768px) {
    width: 120px;
    height: 22.32px;
  }
`;

export const Category = styled.div`
  color: #4f4f4f;
  font-size: 15px;
  margin-left: 10px;
  @media (max-width: 768px) {
    font-size: 13px;
    margin-left: 7px;
  }
`;

export const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
  margin-left: 5px;
  color: #8200ff;

  @media (max-width: 768px) {
    font-size: 20px;
  }
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

  @media (max-width: 768px) {
    width: 76px;
    height: 36px;
    font-size: 12px;
  }
`;
export const WriteButton = styled.button`
  background-color: #8200ff;
  border: none;
  border-radius: 10px;
  width: 120px;
  height: 36px;
  padding: 8px;
  font-size: 15px;
  color: white;
  margin-left: 10px;
  cursor: pointer;
`;
export const MobileWrite = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background-color: #8200ff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  margin-left: 10px;
`;

export const Search = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;
export const ButtonBox = styled.div`
  display: flex;
`;
export const Write = styled.div`
  // display: flex;
`;
export const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  margin-top: 10px;
  margin-right: -12px;
`;

export const SearchInput = styled.input`
  width: 80%;
  height: 90%;
  border: none;
  outline: none;
`;
export const SearchBox = styled.div`
  width: 228px;
  height: 36px;
  border: 1px solid #cfcfcf;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchIcon = styled.img`
  top: 40%;
  right: 145px;
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
