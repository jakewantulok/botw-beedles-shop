import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { InCart } from './InCart';

const ATC = props => {
	const { item } = props;
	const { resetCheckout, checkout, addProduct, cartItems, increase } = useContext(CartContext);
	// const inCart = item => !!cartItems.find(obj => obj.id === item.id);

	const resetChecker = () => { debugger;
		addProduct(item);
		if (checkout) 
			resetCheckout();
	};

	const addMore = () => {
		let cart = InCart(item, cartItems, 'cart');
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
			disabled={InCart(item, cartItems) && InCart(item, cartItems, 'cart') === item.quantity} 
			onClick={() => addMore()} 
			className="btn btn-success add-more-btn">
			Add more
		</button>
	);

	return (InCart(item, cartItems) ? addMoreBtn : atcBtn);
};

export default ATC;
