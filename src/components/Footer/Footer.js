import React from 'react';

export const Footer = props => ( 
  <footer>
    {props.copyright ? props.copyright : ''}
  </footer>
);
