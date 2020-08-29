import React from 'react';
import FormatCurrency from './FormatCurrency';
import ATC from './ATC';

const ProductItem = ({ product }) => (
	<>
		<p>{product.name}</p>
		<p>{FormatCurrency(product.price)}</p>
		<div>
			
			<ATC item={product} />
		</div>
	</>
);

export default ProductItem;
