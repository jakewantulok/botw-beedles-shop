const Storage = cartItems =>
	localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems : []));
const productStorage = viewItem => localStorage.setItem('product', JSON.stringify(viewItem));

export const sumItems = cartItems => {
	Storage(cartItems);
	let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
	let total = cartItems
		.reduce((total, product) => total + product.price * product.quantity, 0)
		.toFixed(2);
	return { itemCount, total };
};

export const CartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_ITEM':
			if (!state.cartItems.find(item => item.id === action.payload.id))
				state.cartItems.push({ ...action.payload, quantity: 1 });
			return {
				...state,
				...sumItems(state.cartItems),
			};
		case 'VIEW_ITEM':
			state.viewItem = { ...action.payload };
			productStorage(action.payload);
			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [...state.cartItems],
			};
		case 'REMOVE_ITEM':
			return {
				...state,
				...sumItems(state.cartItems.filter(item => item.id !== action.payload.id)),
				cartItems: [...state.cartItems.filter(item => item.id !== action.payload.id)],
			};
		case 'INCREASE':
			return {
				cartItems: state.cartItems.map(item =>
					item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
				),
				...sumItems(state.cartItems),
			};
		case 'DECREASE':
			return {
				cartItems: state.cartItems.map(item =>
					item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
				),
				...sumItems(state.cartItems),
			};
		case 'CHECKOUT':
			return {
				cartItems: [],
				checkout: true,
				...sumItems([]),
			};
		case 'RESET':
			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [...state.cartItems],
				checkout: false,
			};
		case 'CLEAR':
			return {
				cartItems: [],
				...sumItems([]),
			};
		default:
			return state;
	}
};
