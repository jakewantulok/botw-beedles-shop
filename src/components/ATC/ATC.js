import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const ATC = props => {
	const { item } = props;
	const { resetCheckout, checkout, addProduct, cartItems, increase } = useContext(CartContext);
	const inCart = item => !!cartItems.find(obj => obj.id === item.id);

	const resetChecker = () => {
		addProduct(item);
		if (checkout) resetCheckout();
	};

	const atcBtn = (
		<button onClick={() => resetChecker()} className="btn btn-outline-primary btn-sm atc-btn">
			Add to cart
		</button>
	);
	const addMoreBtn = (
		<button onClick={() => increase(item)} className="btn btn-outline-success btn-sm add-more-btn">
			Add more
		</button>
	);

	return inCart(item) ? addMoreBtn : atcBtn;
};

export default ATC;
