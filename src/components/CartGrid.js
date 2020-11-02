import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';
import { RupeeIcon } from './Icons';

const repeatedStyles = {
	card: `
		padding: 15px;
		border: 1px solid white;
		background-color: rgba(22, 22, 29, 50%);
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
	height: max-content;
`;

// const CouponWrapper = styled.div`
// 	display: flex;
// 	justify-content: center;
// 	& input {
// 		height: 45px;
// 		width: calc(70% - 10px);
// 		max-width: 150px;
// 	}
// 	& button {
// 		height: 45px;
// 		max-width: 65px;
// 		width: 30%;
// 		margin-left: 10px;
// 	}
// `;

const CartGrid = () => {
	const { cartItems, sumItems, handleCheckout, clearCart } = useContext(CartContext);
	const { overallReducedCost, overallSavings, overallSavingsPercent } = sumItems;

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
			<CheckoutCard id="goToCheckout" className="col-12 col-sm-3 text-center">
				<h2 className="mb-2">Cart Total: </h2>
				<h3>
					<RupeeIcon size="50px" />
					{overallReducedCost}
				</h3>
				<p hidden={overallSavings <= 0} className="font-italic">
					You saved <RupeeIcon />
					{overallSavings} ( {overallSavingsPercent}% )
				</p>
				<hr className="my-4" />
				{/* <CouponWrapper>
					<input id="textInputCoupon" type="text" maxLength="10" />
					<button className="btn btn-primary btn-sm">Apply</button>
				</CouponWrapper> */}
				<div className="text-center">
					<button type="button" className="btn btn-primary mb-2" onClick={handleCheckout}>
						CHECKOUT
					</button>
				</div>
				<button type="button" className="btn text-warning btn-sm font-italic" onClick={clearCart}>
					CLEAR ALL
				</button>
			</CheckoutCard>
		</>
	);
};

export default CartGrid;
