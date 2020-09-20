import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import CartGrid from '../components/CartGrid';

export const Cart = () => {
	const { cartItems, clearCart, checkout } = useContext(CartContext);

	const cartEmptyMsg = (
		<div id="cartEmptyMsg" className="p-3 text-center text-muted">
			<p>Your cart is empty</p>
			<Link to="/" className="btn btn-primary" onClick={clearCart}>
				BACK TO HOME
			</Link>
		</div>
	);

	const buyMoreBtn = (
		<div id="buyMoreBtn" className="p-3 text-center text-success">
			<p>Checkout successful</p>
			<Link to="/" className="btn btn-success" onClick={clearCart}>
				BUY MORE
			</Link>
		</div>
	);

	return (
		<>
			<div className="text-center mt-5">
				<h1>Cart</h1>
			</div>
			<div className="row justify-content-center">
				{cartItems.length > 0 ? <CartGrid /> : <>{checkout ? buyMoreBtn : cartEmptyMsg}</>}
			</div>
		</>
	);
};

export default Cart;
