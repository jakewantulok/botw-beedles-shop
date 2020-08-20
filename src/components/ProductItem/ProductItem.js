import React from 'react';
import styled from 'styled-components';
import formatCurrency from '../FormatCurrency/FormatCurrency';
import SetImg from '../SetImg/SetImg';
import ATC from '../ATC/ATC';

// const Styles = styled.img`
//   .setimg {
//     display: "block"; 
//     margin: "0 auto 10px"; 
//     max-height: "200px";
//   }
// `;

export const ProductItem = ({product}) => (

    <div>
        {/* <SetImg info={product} /> */}
        <p>{product.name}</p>
        <p>{formatCurrency(product.price)}</p>
        <div>
          <ATC item={product} />
        </div>
    </div>

);
