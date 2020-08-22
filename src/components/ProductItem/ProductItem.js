import React from 'react';
import formatCurrency from '../FormatCurrency/FormatCurrency';
import ATC from '../ATC/ATC';

export const ProductItem = ({ product }) => (
	<div>
		<p>{product.name}</p>
		<p>{formatCurrency(product.price)}</p>
		<div>
			<ATC item={product} />
		</div>
	</div>
);
