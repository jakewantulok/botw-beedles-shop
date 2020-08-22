import React from 'react';
import formatCurrency from '../FormatCurrency/FormatCurrency';
import ATC from '../ATC/ATC';

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
