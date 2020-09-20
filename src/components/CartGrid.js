import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';

const repeatedStyles = {
	card: `
		padding: 15px;
		background-color: rgba(22, 22, 29, 75%);
		border-radius: 15px;`,
};

const Info = styled.div`
	display: flex;
	flex-wrap: wrap;
	& div {
		padding-left: 0;
		& div {
			${repeatedStyles.card}
		}
		&:nth-child(3) div {
			margin-right: -15px;
			line-height: 0;
		}
		& :not(div) {
			margin: 0;
		}
	}
`;

const CheckoutCard = styled.div`
	${repeatedStyles.card}
`;

const CartGrid = () => {
	const { cartItems, total, savings, savingsPercent, itemCount, handleCheckout, clearCart } = useContext(CartContext);

	const Items = cartItems.map(product => <CartItem key={product.id} product={product} />);

	return (
		<>
			<div className="col-12 col-sm-8">
				<Info>
					<div className="col-12 col-sm-6">
						<div>
							<h4>Items</h4>
						</div>
					</div>
					<div className="col-12 col-sm-3">
						<div>
							<h4>Qty</h4>
						</div>
					</div>
					<div className="col-12 col-sm-3">
						<div>
							<h4>Price</h4>
						</div>
					</div>
				</Info>
				{Items}
			</div>
			<div className="col-12 col-sm-1" />
			<CheckoutCard id="goToCheckout" className="col-12 col-sm-3">
				<p className="mb-1">Total Items</p>
				<h4 className="mb-3 txt-right">{itemCount}</h4>
				<p className="mb-1">Total Payment</p>
				<h3 className="m-0 txt-right">{total}</h3>
				<hr className="my-4" />
				<p hidden={savings <= 0} className="text-success font-italic">
					You saved {savings} ({savingsPercent}%)
				</p>
				<div className="text-center">
					<button type="button" className="btn btn-primary mb-2" onClick={handleCheckout}>
						CHECKOUT
					</button>
					<button type="button" className="btn btn-outlineprimary btn-sm" onClick={clearCart}>
						CLEAR ALL
					</button>
				</div>
			</CheckoutCard>
		</>
	);
};

export default CartGrid;
