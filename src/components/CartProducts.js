import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';

const Info = styled.div`
	display: flex;
	flex-wrap: wrap;
	& div {
		padding-left: 0;
		& div {
			padding: 15px;
			border-radius: 15px;
			transition: background-color 0.5s;
			transition: border 0.5s;
			background-color: rgba(22, 22, 29, 90%);
			border: 1px solid #16161d00;
		}
		&:nth-child(3) div {
			margin-right: -15px;
		}
	}
`;

const CartProducts = () => {
	const { cartItems, total, savings, savingsPercent, itemCount, handleCheckout, clearCart } = useContext(CartContext);
	return (
		<>
			<div>
				<Info>
					<div class="col-sm-6">
						<div>
							<h4>Items</h4>
						</div>
					</div>
					<div class="col-sm-3">
						<div>
							<h4>Stock</h4>
						</div>
					</div>
					<div class="col-sm-3">
						<div>
							<h4>Price</h4>
						</div>
					</div>
				</Info>
				{cartItems.map(product => (
					<CartItem key={product.id} product={product} />
				))}
			</div>
			<div id="goToCheckout" className="card card-body col-sm-3 p-3">
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
			</div>
		</>
	);
};

export default CartProducts;
