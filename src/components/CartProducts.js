import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';

const CartProducts = () => {
	const { cartItems } = useContext(CartContext);
	const CartProduct = () =>
		cartItems.map(product => <CartItem key={product.id} product={product} />);

	return <div className="card card-body border-0">{CartProduct()}</div>;
};

export default CartProducts;
