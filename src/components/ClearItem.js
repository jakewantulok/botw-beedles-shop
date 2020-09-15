import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ClearItem = props => {
	const { item, children } = props;
	const { removeProduct, cartItems } = useContext(CartContext);
	const hideOnClear = () => !cartItems.find(obj => obj.name === item.name);
	return (
		<button hidden={hideOnClear()} onClick={() => removeProduct(item)} className="btn btn-sm btn-danger">
			{children} Clear All
		</button>
	);
};

export default ClearItem;
