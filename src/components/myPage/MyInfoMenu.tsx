import React, { useEffect, useState } from "react";

import DecoProfile from "./DecoProfile";
import EditProfile from "./EditProfile";
import LikedAnime from "./LikedAnime";
import WhatIWrote from "./WhatIWrote";
import MyReviews from "./MyReviews";
const MyInfoMenu = () => {
  const [selectedComponent, setSelectedComponent] = useState("");
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "DecoProfile":
        return <DecoProfile />;
      case "EditProfile":
        return (
          <EditProfile
            user={{
              created_at: "",
              id: "",
              last_sign_i: null,
              nickname: "",
              profile_img_url: null,
            }}
          />
        );
      case "LikedAnime":
        return <LikedAnime />;
      case "WhatIWrote":
        return <WhatIWrote />;
      case "MyReviews":
        return <MyReviews />;
      default:
        return null;
    }
  };

  return (
    <div>
      <button onClick={() => setSelectedComponent("DecoProfile")}>
        프로필 꾸미기
      </button>
      <button onClick={() => setSelectedComponent("EditProfile")}>
        프로필 수정
      </button>
      <button onClick={() => setSelectedComponent("LikedAnime")}>
        찜한 목록
      </button>
      <button onClick={() => setSelectedComponent("MyReviews")}>
        리뷰 관리
      </button>
      <button onClick={() => setSelectedComponent("WhatIWrote")}>
        작성한 글
      </button>
      {renderSelectedComponent()}
    </div>
  );
};
export default MyInfoMenu;
