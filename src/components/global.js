import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.text}
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text};
  }

`;
