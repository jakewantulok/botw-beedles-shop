import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../context/CartContext';
import { InCart } from './InCart';

const Btn = styled.button`
	margin: 10px 10px 15px 0;
`;

const ATC = props => {
	const { item } = props;
	const { resetCheckout, checkout, addProduct, cartItems, increase } = useContext(CartContext);

	const resetChecker = () => {
		addProduct(item);
		checkout && resetCheckout();
	};

	const addMore = () => {
		let cart = InCart(item, cartItems, 'cart');
		cart === 0 && addProduct(item);
		cart !== item.quantity && increase(item);
	};

	const atcBtn = (
		<Btn onClick={() => resetChecker()} className="btn btn-primary atc-btn">
			Add To Cart
		</Btn>
	);

	const addMoreBtn = (
		<Btn
			disabled={InCart(item, cartItems) && InCart(item, cartItems, 'cart') === item.quantity}
			onClick={() => addMore()}
			className="btn btn-success add-more-btn">
			Add More
		</Btn>
	);
	const soldOutBtn = (
		<Btn disabled={true} className="btn btn-muted">
			SOLD OUT
		</Btn>
	);

	return InCart(item, cartItems) ? (
		<>{InCart(item, cartItems, 'cart') === item.quantity ? soldOutBtn : addMoreBtn}</>
	) : (
		atcBtn
	);
};

export default ATC;
