import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';
import FormatCurrency from '../components/FormatCurrency';

const CartProducts = () => {
	const { cartItems, total, savings, itemCount, handleCheckout, clearCart } = useContext(CartContext);
	return (
		<>
			<div className="card card-body border-0">
				{cartItems.map(product => <CartItem key={product.id} product={product} />)}
			</div>
			<div id="goToCheckout" className="card card-body col-sm-3 p-3">
			<p className="mb-1">Total Items</p>
			<h4 className="mb-3 txt-right">
				{itemCount}
			</h4>
			<p className="mb-1">Total Payment</p>
			<h3 className="m-0 txt-right">
				{FormatCurrency(total)}
			</h3>
			<hr className="my-4" />
			<p hidden={savings <= 0} className='text-success'>You saved {FormatCurrency(savings)}!</p>
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
