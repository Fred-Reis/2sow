import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body{
    background: linear-gradient(45deg, rgba(122, 29, 198, 0.1), rgba(122, 29, 198, 0.6), rgba(122, 29, 198, 1));
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button{
    font-family: 'Raleway', sans-serif;
  }

  h1, h2,h3,h4,h5, h6, strong{
    font-weight: 700;
  }

  button{
    cursor: pointer;
  }
`;
