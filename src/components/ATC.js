import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import styled from 'styled-components';

const Btn = styled.button`
	margin: 10px 10px 15px 0;
`;

const ATC = props => {
	const { item, inCart } = props;
	const { resetCheckout, checkout, addProduct, increase } = useContext(CartContext);
	let safeATC;

	const resetChecker = () => {
		addProduct(item);
		checkout && resetCheckout();
	};
	const addMore = () => {
		inCart === 0 && addProduct(item);
		inCart !== item.quantity && increase(item);
	};

	const atcBtn = (
		<Btn onClick={() => resetChecker()} className="btn btn-primary atc-btn">
			Add To Cart
		</Btn>
	);

	const soldOutBtn = (
		<Btn disabled={true} className="btn btn-danger">
			SOLD OUT
		</Btn>
	);

	const addMoreBtn =
		inCart !== item.quantity ? (
			<Btn disabled={inCart === item.quantity} onClick={() => addMore()} className="btn btn-success add-more-btn">
				Add More
			</Btn>
		) : (
			soldOutBtn
		);

	if (item.name) {
		if (inCart === 0) {
			safeATC = atcBtn;
		} else {
			if (item.quantity > item.quantity - inCart) {
				safeATC = addMoreBtn;
			} else {
				safeATC = soldOutBtn;
			}
		}
	} else {
		safeATC = (
			<Btn disabled={true} className="btn btn-dark">
				SELECT AN OPTION
			</Btn>
		);
	}

	return (
		<>
			{safeATC}
			<span hidden={item.quantity - inCart > 15} className="sizeQty text-warning font-italic">
				{item.quantity - inCart} LEFT! {}
			</span>
		</>
	);
};

export default ATC;
