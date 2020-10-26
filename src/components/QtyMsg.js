import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
//import { inCart } from '../functions/inCart';

const QtyMsg = ({ item }) => {
	const { sumItems } = useContext(CartContext);
	const { subcategories } = sumItems;

	const filtered = subcategories.filter(cartItem => cartItem.subcategory === item.subcategory);
	let itemCount = 0;

	if (filtered.length > 0) itemCount = filtered[0].itemCount;
	return (
		<span className="sizeQty text-info font-italic">
			{item.quantity - itemCount} LEFT! {}
		</span>
	);
};

export default QtyMsg;
