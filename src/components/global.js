//import React from 'react';
//import { MenuIcon } from './Icons';
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

  .btn-filter {
    color: white;
    background-color: #6f42c1;
  }

  hr {
    border-top: 1px solid white;
  }

  #textInputCoupon {
    margin-bottom: 20px;
    border-radius: 10px;
    padding: 10px;
    border: none;
  }

  .navbar-light, 
  .navbar-dark {
    background-color: rgba(22,22,29,50%);
  }

  .navbar-light .navbar-brand, 
  .navbar-dark .navbar-brand,
  .navbar-light .navbar-nav .nav-link,
  .navbar-dark .navbar-nav .nav-link {
    color: white;
    &:hover {
      color: #17a2b8;
    }
  }

  .navbar-light .navbar-toggler-icon,
  .navbar-dark .navbar-toggler-icon {
    background-image: url(./menu.svg);
    width: 40px;
    height: 40px;
  }

  .navbar-light .navbar-toggler,
  .navbar-dark .navbar-toggler {
    border: none;
    padding: 0;
  }

  .navbar-collapse {
    margin-left: 75px;
  }

  @media (max-width: 767px) {
    .navbar-collapse .btn-theme,
    .shop-title.expanded {
      display: none;
    }
  }

  @media (min-width: 768px) {
    .btn-theme.mobile,
    .shop-title.mobile {
      display: none;
    }
  }

`;
