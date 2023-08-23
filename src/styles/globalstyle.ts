import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset};  

body{
    margin:0 auto;
    max-width: 75%;
}

.embla{
    width:100vw;
    margin-left: calc(-50vw + 50%);
    overflow: hidden;
}
`;
