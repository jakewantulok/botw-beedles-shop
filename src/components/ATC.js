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

	// this is a way to check ahead if optionSelected can in fact be added to cart
	const testObj = {
		itemName: item.name,
		itemQuantity: item.quantity,
		itemBulk: item.bulk,
		inCart: inCart,
		expression: 'item.quantity - (inCart + item.bulk) ',
		result: item.quantity - (inCart + item.bulk),
	};

	if (/Bomb/.test(item.name)) console.table(testObj);

	const resetChecker = () => {
		addProduct(item);
		checkout && resetCheckout();
	};
	const addMore = () => {
		inCart === 0 && addProduct(item);
		inCart !== item.quantity && increase(item);
	};

	const atcBtn = (
		<Btn
			disabled={item.quantity - (inCart + item.bulk) < 0}
			onClick={() => resetChecker()}
			className={
				item.quantity - (inCart + item.bulk) < 0 ? 'btn btn-secondary add-more-btn' : 'btn btn-primary atc-btn'
			}>
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
			<Btn
				disabled={item.quantity - (inCart + item.bulk) < 0}
				onClick={() => addMore()}
				className={
					item.quantity - (inCart + item.bulk) < 0 ? 'btn btn-secondary add-more-btn' : 'btn btn-success add-more-btn'
				}>
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
			<span
				hidden={item.quantity - inCart > 15 || item.quantity - inCart <= 0}
				className="sizeQty text-warning font-italic">
				{item.quantity - inCart} LEFT! {}
			</span>
		</>
	);
};

export default ATC;
