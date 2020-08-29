import React from 'react';
import FormatCurrency from './FormatCurrency';
import ATC from './ATC';

const ProductSizes = ({ product }) => {

  const sizeBtns = product.sizes.map(size => {
    if (size.inventory)
      <ATC id={} size=/>
  }); 

  return (
	<>
			
	</>
);

export default ProductSizes;


// radio button for sizes,
// when size is selected, check if in cart already
// add to cart size, and if user switches to other size check inventory again
// basically treat each size as its own separate product

// cart should show one product name but with sizes and qty shown as a subtext with an interal subtotal
