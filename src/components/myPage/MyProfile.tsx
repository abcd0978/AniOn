import { useAtomValue } from 'jotai'; // Import from jotai
import { Profile } from './Styled.MyPage/MyPage.styles';
import MyProfileAward from './MyProfileAward';
import MyPoint from './MyPoint';
import * as userStore from '../../store/userStore';
import ProfileWithBorder from '../ProfileWithBorder';
import useViewport from '../../hooks/useViewPort';
import Loading from '../Loading/Loading';
const MyProfile = () => {
  const user = useAtomValue(userStore.user);
  const { width } = useViewport();

  if (!user) {
    return <Loading />;
  }

  return (
    <Profile.MyProfileContainer>
      <Profile.MobileInfo>
        <Profile.MyMobilePhoto>
          {user && (
            <ProfileWithBorder
              $mediawidth={width}
              width={window.innerWidth <= 768 ? 450 : 200}
              key={user?.id!}
            />
          )}
        </Profile.MyMobilePhoto>
        <Profile.MyMobileInfo>
          <Profile.MyNickname>{user?.nickname}</Profile.MyNickname>
          <MyProfileAward />
          <MyPoint />
        </Profile.MyMobileInfo>
      </Profile.MobileInfo>
    </Profile.MyProfileContainer>
  );
};

export default MyProfile;
