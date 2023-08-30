import questionMark from '../assets/question_mark.svg';
import { S } from '../components/worldcup/worldCup.style';
import { useNavigate } from 'react-router';
import navigate_next from '../assets/navigate_next.svg';
import quizmale from '../assets/quizmale.png';
import quizfemale from '../assets/quizfemale.png';

function WorldCup() {
  const navigate = useNavigate();

  return (
    <>
      <S.WorldCupContainer2>
        <S.WorldCupMainTitle>이상형 월드컵</S.WorldCupMainTitle>
        <S.WorldCupTestContainer>
          <S.WorldCupTest height={781}>
            <S.WorldCupUp>
              <div>
                <S.WorldCupGender>남자 캐릭터</S.WorldCupGender>
                <S.WorldCupTitles>애니메이션 캐릭터</S.WorldCupTitles>
                <S.WorldCupTitles>이상형 월드컵</S.WorldCupTitles>
              </div>
              <S.WorldCupImgs>
                <img src={quizmale} alt="퀴즈남자" />
                <img id="question" src={questionMark} alt="questionMark" />
              </S.WorldCupImgs>
            </S.WorldCupUp>
            <S.WorldCupTestButton
              onClick={() => {
                navigate('/worldcup/man');
              }}
              width={278}
            >
              <S.WorldCupTestButtonTextBox>
                테스트하러 가기
                <img src={navigate_next} />
              </S.WorldCupTestButtonTextBox>
            </S.WorldCupTestButton>
          </S.WorldCupTest>
          <S.WorldCupTest height={781}>
            <S.WorldCupUp>
              <div>
                <S.WorldCupGender>여자 캐릭터</S.WorldCupGender>
                <S.WorldCupTitles>애니메이션 캐릭터</S.WorldCupTitles>
                <S.WorldCupTitles>이상형 월드컵</S.WorldCupTitles>
              </div>
              <S.WorldCupImgs>
                <img src={quizfemale} alt="퀴즈여자" />
                <img id="question" src={questionMark} alt="questionMark" />
              </S.WorldCupImgs>
            </S.WorldCupUp>
            <S.WorldCupTestButton
              onClick={() => {
                navigate('/worldcup/woman');
              }}
              width={278}
            >
              <S.WorldCupTestButtonTextBox>
                테스트하러 가기
                <img src={navigate_next} />
              </S.WorldCupTestButtonTextBox>
            </S.WorldCupTestButton>
          </S.WorldCupTest>
        </S.WorldCupTestContainer>
      </S.WorldCupContainer2>
    </>
  );
}

export default WorldCup;
