import {createGlobalStyle} from 'styled-components'

const GlobalStyles = createGlobalStyle`

:root {
    --primary-color:#E22D2D;
    --primary-dark:#B41818;
    --primary-lite:#E95D5D;
    --pimary-extra-lite:#FCCECE;

    --secondary-color:#5F6DCB;
    --secondary-dark:#394179;
    --secondary-lite:#8D98F5;
    --secondary-extra-lite:#D4D4FF;

    --text-black: #000000;
    --text-gray:#706E6E;
    --text-highlite:#4870B8;
}

 p{
    font-family: 'Open Sans';
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;

 }
  
  h1{
  
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 27px;
    text-align: center;
    letter-spacing: 0.164211px;
  }

  h3{
    
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    text-align: center;
    letter-spacing: -0.0853333px;
  }
  
  body {
    
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    font-Weight: "bold";
    font-Style: "normal";
    border-Radius: "16px";
  
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.0693333px;
    }

  
`

export default GlobalStyles
