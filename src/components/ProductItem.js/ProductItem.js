import React from 'react';
import ATC from '../ATC/ATC';
import formatCurrency from '../FormatCurrency/FormatCurrency';

export const ProductItem = ({product}) => ( 
  <div className="card card-body">
      <p>{product.name}</p>
      <p className="text-left">{formatCurrency(product.price)}</p>
      <div className="text-right">
        {/* <ATC item={product} /> */}
      </div>
  </div>
);
