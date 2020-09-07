import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { InCart } from './InCart';

const ATC = props => {
	const { item } = props;
	const { resetCheckout, checkout, addProduct, cartItems, increase } = useContext(CartContext);

	const resetChecker = () => {
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
			ADD TO CART
		</button>
	);

	const addMoreBtn = (
		<button 
			disabled={InCart(item, cartItems) && InCart(item, cartItems, 'cart') === item.quantity} 
			onClick={() => addMore()} 
			className="btn btn-success add-more-btn">
			ADD MORE
		</button>
	);
	const soldOutBtn = (
		<button disabled={true} className='btn btn-outline-danger'>SOLD OUT</button>
	);

	return (InCart(item, cartItems) ? <>{InCart(item, cartItems, 'cart') === item.quantity ? soldOutBtn : addMoreBtn}</> : atcBtn);
};

export default ATC;
