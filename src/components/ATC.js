import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ATC = props => {
	const { item } = props;
	const { resetCheckout, checkout, addProduct, cartItems, increase } = useContext(CartContext);
	const inCart = item => !!cartItems.find(obj => obj.id === item.id);

	const resetChecker = () => {
		addProduct(item);
		if (checkout) 
			resetCheckout();
	};

	const addMore = () => {
		let cart = cartItems.find(obj => obj.id === item.id).cart;

		cart === 0 && addProduct(item);
		cart !== item.quantity && increase(item);
	};

	const atcBtn = (
		<button onClick={() => resetChecker()} className="btn btn-primary atc-btn">
			Add to cart
		</button>
	);
	const addMoreBtn = (
		<button 
			disabled={inCart(item) && cartItems.find(obj => obj.id === item.id).cart === item.quantity} 
			onClick={() => addMore()} 
			className="btn btn-success add-more-btn">
			Add more
		</button>
	);

	return inCart(item) ? addMoreBtn : atcBtn;
};

export default ATC;
