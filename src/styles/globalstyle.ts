import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
${reset};  

@font-face {
    font-family: 'Cafe24Ssurround';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24Ssurround.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}


*{
    font-family: 'Pretendard-Regular';
}


body{
    margin:0 auto;
    max-width: 75%;
    overflow-x: hidden;
    font-family: 'Pretendard-Regular';
    @media (max-width: 768px) {
        max-width: 90%;
    }
}
header{
    width:100vw;
    margin-left: calc(-50vw + 50%);
}
.sidebar{
    width:100vw;
    height: 100vh;
    left: -100vw;
    transition: all 0.3s ease;
}
.sidebar.opened {
    padding: 20px 0px;
    left: 0;
}
.embla:not(.middle){
    width:100vw;
    margin-left: calc(-50vw + 50%);
    overflow: hidden;
}


`;
