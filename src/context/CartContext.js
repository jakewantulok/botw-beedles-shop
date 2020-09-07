import React, { createContext, useReducer } from 'react';
import { CartReducer, sumItems } from './CartReducer';

export const CartContext = createContext();

const storage = localStorage.getItem('cart') 
	? JSON.parse(localStorage.getItem('cart')) 
	: [];

const productStorage = localStorage.getItem('product')
	? JSON.parse(localStorage.getItem('product'))
	: [];

const initialState = {
	cartItems: storage,
	viewItem: productStorage,
	...sumItems(storage),
	checkout: false,
};

const CartContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(CartReducer, initialState);

	const increase = payload => dispatch({ type: 'INCREASE', payload });

	const decrease = payload => dispatch({ type: 'DECREASE', payload });

	const addProduct = payload => dispatch({ type: 'ADD_ITEM', payload });

	const viewProduct = payload => dispatch({ type: 'VIEW_ITEM', payload });

	const removeProduct = payload => dispatch({ type: 'REMOVE_ITEM', payload });

	// const setQuantity = (payload, qty) => dispatch({ type: 'SET_QUANTITY', qty: qty, payload });

	const clearCart = () => dispatch({ type: 'CLEAR' });

	const resetCheckout = () => dispatch({ type: 'RESET' });

	const handleCheckout = () => dispatch({ type: 'CHECKOUT' });

	const contextValues = {
		// setQuantity,
		removeProduct,
		addProduct,
		viewProduct,
		increase,
		decrease,
		clearCart,
		resetCheckout,
		handleCheckout,
		...state,
	};

	return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
