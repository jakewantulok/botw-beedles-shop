import React, { createContext, useReducer } from 'react';
import { CartReducer } from './CartReducer';

export const CartContext = createContext();

const defaultSumData = {
	cartCount: 0,
	overallCost: 0,
	overallReducedCost: 0,
	overallSavings: 0,
	overallSavingsPercent: 0,
	subcategories: [],
};

!localStorage.getItem('cart') && localStorage.setItem('cart', JSON.stringify([]));
!localStorage.getItem('sumItems') && localStorage.setItem('sumItems', JSON.stringify(defaultSumData));
!localStorage.getItem('product') && localStorage.setItem('product', JSON.stringify([]));

const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const sumStorage = localStorage.getItem('sumItems') ? JSON.parse(localStorage.getItem('sumItems')) : [];
const productStorage = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];

const initialState = {
	cartItems: storage,
	viewItem: productStorage,
	sumItems: { ...sumStorage },
	checkout: false,
};

const CartContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(CartReducer, initialState);

	const increase = payload => dispatch({ type: 'INCREASE', payload });

	const decrease = payload => dispatch({ type: 'DECREASE', payload });

	const addProduct = payload => dispatch({ type: 'ADD_ITEM', payload });

	const viewProduct = payload => dispatch({ type: 'VIEW_ITEM', payload });

	const removeProduct = payload => dispatch({ type: 'REMOVE_ITEM', payload });

	const clearCart = () => dispatch({ type: 'CLEAR' });

	const resetCheckout = () => dispatch({ type: 'RESET' });

	const handleCheckout = () => dispatch({ type: 'CHECKOUT' });

	const contextValues = {
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
