 # 현재 supabase 관련 문제로 인해 supabase를 사용하는 기능들이 작동하지 않습니다. 불편하시더라도 추후 이용해주세요.
 
 ## 간혹 KT 인터넷을 사용하시는 분 중 해외 IP로 차단돼 API를 불러오지 못하는 문제가 있습니다.

**몇일 기다리면 다시 작동하오니, 만약 문제가 발생한다면 나중에 다시 접속해주시면 감사하겠습니다.**


# Ani-ON

![Frame_1](https://github.com/abcd0978/AniOn/assets/48148112/8a7cd10e-ce6c-4899-ac1d-dae99a557604)


**일본 애니메이션 입문자, 중급자 등 팬들을 위한 종합 애니메이션 커뮤니티 플랫폼입니다.**

🎉 다양한 애니메이션 콘텐츠의 풍부한 세계로 떠나보세요. 신나는 여정이 여기에서 시작됩니다!

🎮 **이상형 테스트**도 즐기고 **댓글, 리뷰**를 작성하며 **포인트**를 획득할 수 있어요.

💰 포인트를 사용하여 **특별한 아이템**을 구매 해 자신을 나타내보세요.


- 서비스 둘러보기 : [Vercel](https://ani-on.vercel.app/)
- Notion 주소 : [Notion](https://literate-ixia-ac1.notion.site/Ani-ON-0508ffa70f4e408dadadd7e71df253e9?pvs=4)

## 👩🏻‍💻 기술 스택


`react` `typescript` `styled components` `Jotai` `tanstack-query` `supabase` `vercel` `laftel api` `kakao api` `embla-carousel-react` 

## ⌚ 개발 기간

**2023.08.16 ~ 2023.09.18 (5주)**


## 프로젝트 인원

### 프론트엔드 5명, 디자이너 1명

 이름  | 직책   | 블로그                                                           | 깃허브                         
:---:|:----:|:-------------------------------------------------------------:|:---------------------------:
 이소영 | 리더   | https://blog.naver.com/ddooo__ding                            | https://github.com/ddooo00  
 정송주 | 부리더  | https://www.notion.so/87152dd202f7436db1bfebd9b20ac04e?pvs=21 | https://github.com/songjuu  
 박은희 | 팀원   | https://eunhee9902.tistory.com/                               | https://github.com/baguni99 
 김무겸 | 팀원   | https://frian.tistory.com/                                    | https://github.com/hgyeom   
 김민규 | 팀원   | https://hungryspider.tistory.com/                             | https://github.com/abcd0978 
 김예림 | 디자이너 |                                                               |                             


---

# 📐 Ani-ON 아키텍처 구성

## 아키텍처

![ANION_중간발표_서비스아키텍처 (2)](https://github.com/abcd0978/AniOn/assets/48148112/ef83275b-4d56-4d3b-a92e-fcf9047ee3cc)

## ERD
![image](https://github.com/abcd0978/AniOn/assets/96222942/caf2878e-b4f1-4b03-b9b7-c41240ce1202)

---

# 💻 기술적 의사결정

## 사용 기술 의사결정:

- 1️⃣ **Library & Language**
    
    **React**
    
    - **동적 UI**를 구축할 수 있습니다.
    - 컴포넌트 기반 아키텍처를 활용하여 **사용자 경험을 향상** 하기 위해 사용합니다.
    
    **Typescript**
    
    - **코드의 안정성**을 높이기 위해 정적 타입 검사를 활용하여 개발 생산성을 향상 시키기 위해 사용합니다.
    
    **Tanstack Query**
    
    - 서버와의 데이터 통신을 간단하게 처리하며 데이터 가져오기와 관리를 용이하게 하기 위해 사용합니다. 또한, 가져온 데이터를 자동으로 캐싱하며, 데이터가 업데이트될 때 자동으로 다시 가져오거나 업데이트 된 데이터를 표시합니다. 이를 통해 실시간 업데이트를 손쉽게 구현할 수 있습니다.  그리고 페이지네이션 및 무한 스크롤과 같은 데이터 로딩 패턴을 지원합니다. 이를 통해 대용량 데이터셋을 효율적으로 처리할 수 있습니다.
    
    **Jotai**
    
    - Redux는 상태 관리를 위한 라이브러리이지만 Redux의 API는 상대적으로 복잡합니다. **`store`**, **`action`**, **`reducer`**, **`dispatch`** 등 여러 개념을 다뤄야 합니다. 또한 Redux의 Boilerplate 코드 양이 상당히 많아질 수 있습니다. 하지만, Jotai는 redux에 비해 간단하고 직관적인 API를 제공합니다. Atom이라는 개념을 사용하여 상태를 정의하고, 이를 React 컴포넌트 내에서 직접 사용할 수 있습니다. 또한 Jotai는 더 적은 Boilerplate 코드를 필요로 합니다.
    
    **React Toastify**
    
    - alert창을 꾸미기 위해 사용합니다.
    

---

- **2️⃣ supabase**
    - **강력한 데이터베이스**와 인증 기능을 제공하여  손쉽게 데이터를 관리하고 사용자 인증을 구현하기 위해 사용합니다.
    - firebase에 비해 auth **사용자 수 제한이 없고**, 읽기 수, 쓰기 수 등 기능적으로 더욱 빠른 성능을 가지고 있습니다.
    - supabase가 Firebase 보다 초당 읽기 수가 최대 4배, 쓰기 수는 초당 3.1배 빠릅니다.
    - Firebase는 클라우드 호스팅만 지원하는 반면, supabase는 셀프 호스팅과 클리우드 호스팅 둘 다 가능합니다.

---

- 3️⃣ **API**
    
    **Laftel**
    
    - **애니메이션 정보**를 가져오기 위해 사용합니다.
    - 분기마다 방영된 애니메이션 정보 , 장르별 정보 등 세세한 애니메이션 정보를 가져올 수 있습니다.
    
    **Kakao** 
    
    - **카카오톡 공유하기** 기능을 위해 사용합니다.

---

- **4️⃣ Vercel**
    - 정적 웹사이트를 더 쉽게 빌드하고 배포할 수 있습니다.
    - 프론트엔드 빌드 및 배포에 초점을 맞춘 플랫폼이기 때문에 채택했습니다.
    - git 저장소를 자동으로 인식하고, 변경 사항을 감지하여 배포하므로 **자동화 된 배포**가 가능합니다.

---

## UX 기술 의사결정:

- 5️⃣ **무한스크롤vs페이지네이션**
    
    방대한 정보량을 가진 애니리스트 페이지에서는 무한스크롤을 사용하였고, 게시판과 상점페이지, 마이페이지 보유 아이템 보기에서는 페이지네이션을 사용하였습니다. 애니리스트페이지는 많은 애니메이션 목록들을 보여주기 때문에, 페이지네이션에 비해 더 맣은 정보를 빠르게 제공 할 수 있습니다. 또한, 모바일 환경에서의 효율성을 고려했습니다. 추가적인 페이지로딩을 피할수있어 모바일에서 더빠른 속도로 더 많은 정보를 볼 수있습니다. 게시판과, 상점목록에서는 특정 정렬기준에따른 정보를 세세하게 보여주는것이 중요하다고 생각해, 정보를 빠르게 불러오는 무한스크롤이 아닌, 페이지네이션을 채택하였습니다.
    

---

# 🚀 트러블 슈팅

- **1) 마이 페이지 찜한 목록 로딩 긴 문제**
    
    원래 이전 코드에서는 `**useEffect**`내부에서 좋아요 한 애니메이션의 목록을 가져온 후 , 각각의 아이템에 대해 데이터를 요청하고 있기 때문에 좋아요 한 애니메이션의 수만큼 네트워크 요청을 보내야 했지만, 바뀐 코드는`**useQuery**`를 사용해서 user id를 기반으로 요청을 한 번만 보내게 되어 로딩 시간을 ****70% 줄임
    
- **2) supabase inner join**
    
    데이터 베이스의 여러 테이블을 한번에 조회하는데 어려움이  있었습니다.
    
    ![Untitled](https://github.com/abcd0978/AniOn/assets/48148112/a8666a92-3d7f-4255-ad6f-65adf21f3bd6)

    
    post 에서 게시글을 볼 때 인벤토리를 가져와야 하는데, 데이터 요청을 각각 하면 편하지만 비용이 많이 들어가는 문제가 있었고, 포스트와 인벤토리가 직접적인 연관이 없어 일반적인 `**select**`로는 가져올 수 없었습니다. 
    
    하지만 유저와 인벤토리에는 관계가 있었기 때문에 유저와의 `**inner join**`을 통해서 포스트와 유저,인벤토리,아이템 네 테이블의 데이터를 한번에 가져옴으로써 db요청을 세 번에서 한 번으로 줄임으로써 비용을 절감할 수 있었습니다.
    
- **3) 새로운 데이터를 받아올 때 무한 스크롤 자동 증가 현상**
    
    리스트 페이지에서 새로운 데이터를 받아올 때 무한 스크롤의 offset이 자동으로 증가하는 현상이 있었습니다. 이는 `**useEffect**`의 `**clean-up 함수**`를 이용하여 새로운 데이터를 받아올 때 offset을 초기화 시켜 줌으로써 해결할 수 있었습니다.
    
- **4) ts react에서 사용하는 editor 플러그인 라이브러리 부족**
    
    ts react에서 지원하는 에디터가 거의 없었지만, **`react-quill에디터`**를 찾아 적용했습니다.
    react-quill에디터에서 사용하는 플러그인들이 js로 작성되어있어,  ts를 사용하는 `**서드파티 라이브러리**`를 사용하여 ts react에 적용 성공했습니다. 
    
- **5) 닉네임과 프로필 사진 변경 시 헤더에 즉각 반영 되지 않는 문제**
    
    닉네임과 프로필 사진 변경 시에 supabase데이터베이스와 auth의 metadata를 수정하였으나, 그 변경 사항이 즉각 반영이 되지 않는 문제가 있었습니다. 이를 해결하기 위해 프로필 수정 즉시   `**jotai(전역상태관리라이브러리)**`를 사용하여 헤더에 실시간 반영하여 문제를 해결하였습니다. 
    
- **6) API에서 가져오는 동영상 확장자(m3u8)가 브라우저에서 재생이 되지 않는 문제**
    
    API를 이용하여 받아온 동영상이 whale브라우저를 제외한 모든 브라우저에서 재생이 불가능한 문제가 있었습니다. 
    **`Hls.js 라이브러리`**를 사용하여 m3u8확장자의 동영상을  크롬, 파이어폭스 브라우저에서도 재생 되게끔 구현하였습니다.
    
- **7) 소셜로그인과 일반로그인을 동시에 사용할 시에 user정보를 불러오는 방법에 따른 문제**
    
    동일한 email로 일반로그인을 먼저하고, 그 뒤 소셜로그인을 했을 시에, identity가 추가되는 한편, user_metadata는 각각의 provider에따라 달라지기 때문에, 유저의 정보가 일관되지 않는 문제가 있었습니다.
    
    따라서 이메일 하나마다 supabase의 auth.user.metadata에 관련정보를 저장해서, 일반로그인과, 소셜로그인의 각각의 provider에 상관없이 일관된 user정보가 보이게끔 해서 문제를 풀었습니다.

   ![Untitled 1](https://github.com/abcd0978/AniOn/assets/48148112/033e40aa-ff3f-4cad-852a-c62c8c4ec3ad)


    
- **8) 소셜로그인과 일반로그인을 동시에 사용할 시에 user정보를 불러오는 시(時)점에 따른 문제**
    
    일반로그인 과는 다르게, 소셜로그인을 할때에는, 인증url→홈url 리다이렉트 이후에 유저정보가 저장되는 방식으로, signInWithProvider 함수에서는 유저정보를 리턴하지 않아, 유저정보를 가져오는데 문제가 있었습니다.  그전에는 모든 페이지 마다, 인증여부를 검사해서 유저정보를 가져왔지만, database와의 빈번한 통신때문에 성능이 저하되는 우려가 있었습니다.
    
    따라서, 소셜로그인시에는, AfterSocialLogin이라는 페이지로 리다이렉트 시켜, 유저정보를 저장하고, 다시 홈으로 리다이렉트 시켜서 일반로그인과 소셜로그인시에 user정보를 불러오는 시점에 따른 문제를 해결하였습니다.
    
    
    ![Untitled 2](https://github.com/abcd0978/AniOn/assets/48148112/f06db2e9-a610-4075-92b2-193443ff5d0a)


# 📷 스크린샷:

- 스크린샷들
    - 메인페이지
        
        ### 메인페이지 데스크탑
        
        ![메인](https://github.com/abcd0978/AniOn/assets/48148112/e3d264a0-1ca2-4d34-9b2a-edac10645e04)

        
        ### 메인페이지 확대
        
        ![메인확대](https://github.com/abcd0978/AniOn/assets/48148112/4712770f-fa4d-4eb4-a70b-12efabf22452)

        
    - 상점페이지
        
        ### 상점홈
        
        ![상점](https://github.com/abcd0978/AniOn/assets/48148112/b72fe6df-7aeb-4dca-ba57-bfdf20598b3e)

        
        ### 상점모달
        
        ![상점_모달](https://github.com/abcd0978/AniOn/assets/48148112/9b4099ee-916c-4b19-8b21-6c81d6ab505e)

        
    - 애니리스트페이지
        
        ### 애니리스트홈
        
        ![애니리스트](https://github.com/abcd0978/AniOn/assets/48148112/0c497a3f-0dbb-4cc5-8a79-a281302c1813)

        
    - 애니상세페이지
        
        ### 애니상세페이지 데스크탑
        
        ![Untitled](https://github.com/abcd0978/AniOn/assets/48148112/80569ebc-8c94-40d4-a8d4-4286c887b7df)

        
        ### 애니상세페이지 확대
        
        ![애니상세](https://github.com/abcd0978/AniOn/assets/48148112/da21df3a-c48c-4e1c-bf63-0e6d2c7ebc34)

    - 게시판
        
        ### 게시판상세확대
        
        ![localhost_3000_ (3) (2)](https://github.com/abcd0978/AniOn/assets/48148112/baff12c1-d916-48af-a414-aabff5efdb0f)

        
        ### 게시판상세
        
        ![localhost_3000_ (2) (2)](https://github.com/abcd0978/AniOn/assets/48148112/a667cbf4-074a-45c9-9047-50536b467cdb)

        
        ### 게시판메인
        
        ![게시판](https://github.com/abcd0978/AniOn/assets/48148112/c9975117-2e85-4985-a1a7-1e70c4b09111)

        
    - 마이페이지
        
        ### 마이페이지:프로필변경
        
        ![마이페이지프로필](https://github.com/abcd0978/AniOn/assets/48148112/341b37c8-b5e3-40e5-8fe2-af8b14d53b18)

        ### 마이페이지:찜
        
        ![마이페이지찜](https://github.com/abcd0978/AniOn/assets/48148112/7243a1be-dd7b-4138-a463-d708520627d3)

        
        ### 마이페이지:아이템
        
        ![마이페이지아이템](https://github.com/abcd0978/AniOn/assets/48148112/4591cf63-e63f-4b9a-beb1-3145e2d96f17)
        
    - 칭호, 테두리
 
        ### 칭호, 테두리 장착(변경)

        ![칭호테두리변경](https://github.com/abcd0978/AniOn/assets/96222942/7d5c0ed1-c67e-4c75-a6ea-f896ec586311)

        ### 게시판에서의 프로필

        ![image](https://github.com/abcd0978/AniOn/assets/96222942/f1257357-2e2a-48ea-8f93-7e9ceb744880)


        
    - 이상형월드컵
        
        ### 이상형월드컵 진입
        
        ![월1](https://github.com/abcd0978/AniOn/assets/48148112/ffa49a11-da2d-4648-b752-e1cc14311d2a)
        
        ### 이상형월드컵 진행
        
        ![월2](https://github.com/abcd0978/AniOn/assets/48148112/b38d570a-c785-442e-b6bf-91aa6d83f604)
        
        ### 이상형월드컵 종료
        
        ![월3](https://github.com/abcd0978/AniOn/assets/48148112/d5b332cd-428f-477d-b4aa-79dac5544674)
         
    - 쪽지
         
        ### 쪽지
         
        ![img](https://github.com/abcd0978/AniOn/assets/96222942/ce7228a1-eb67-48d8-83a1-a25798d69ab4)


# 🏆 수상

 **내일배움캠프 리액트 Best Project 수상 🎉**

 ![image](https://github.com/abcd0978/AniOn/assets/96222942/4d0462de-dcab-4124-80c7-539f88fe78ab)

