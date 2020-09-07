import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import CartProducts from '../components/CartProducts';

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
		<Layout title="Cart" description="This is the Cart page">
			<div className="text-center mt-5">
				<h1>Cart</h1>
			</div>

			<div className="row no-gutters justify-content-center">
				{cartItems.length > 0 
				? <CartProducts /> 
				: <>{checkout ? buyMoreBtn : cartEmptyMsg}</>}
			</div>
		</Layout>
	);
};

export default Cart;
