const productStorage = viewItem => localStorage.setItem('product', JSON.stringify(viewItem));

export const sumItems = cartItems => {
	let itemCount = cartItems.reduce((acc, { cart } ) => acc + cart, 0);
	let total = cartItems.reduce((acc, { sale, cart }) => acc + sale * cart, 0).toFixed(2);
	let fullTotal = cartItems.reduce((acc, { price, cart }) => acc + price * cart, 0).toFixed(2);
	let savings = fullTotal - total;
	localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems : []));

	return { itemCount, total, savings };
};

export const CartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_ITEM':
			const addItem = (
				!state.cartItems.find(item => item.id === action.payload.id) 
				? [...state.cartItems, { ...action.payload, cart: 1 }]
				: [...state.cartItems]
			);
			return {
				...state,
				cartItems: addItem,
				...sumItems(addItem),
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
			const oneMore = (
				state.cartItems.map(item =>
					item.id === action.payload.id && action.payload.cart < action.payload.quantity ? { ...item, cart: item.cart + 1} : item)
			);
			return {
				...state,
				cartItems: oneMore,
				...sumItems(oneMore),
			};
		case 'DECREASE':
			const oneLess = (state.cartItems.map(item =>
				item.id === action.payload.id && action.payload.cart > 0 ? { ...item, cart: item.cart - 1} : item)
			);
			return {
				...state,
				cartItems: oneLess,
				...sumItems(oneLess),
			};
		// case 'SET_QUANTITY':
		// 	console.log(action.qty);
		// 	return {
		// 		cartItems: state.cartItems.map(item =>
		// 			item.id === action.payload.id ? { ...item, cart: action.qty } : item
		// 		),
		// 		...sumItems(state.cartItems),
		// 	};
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
