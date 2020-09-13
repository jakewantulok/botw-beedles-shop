const productStorage = viewItem => localStorage.setItem('product', JSON.stringify(viewItem));

export const sumItems = cartItems => {
	const itemCount = cartItems.reduce((acc, { cart }) => acc + cart, 0);

	const fullTotal = cartItems.reduce((acc, { price, cart }) => acc + price * cart, 0).toFixed(2);
	const total = cartItems.reduce((acc, { sale, cart }) => acc + sale * cart, 0).toFixed(2);
	const savings = fullTotal - total;
	const savingsPercent = ((savings / fullTotal) * 100).toFixed(0);

	localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems : []));

	return { itemCount, total, savings, savingsPercent };
};

export const CartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_ITEM':
			let cartItems = [...state.cartItems];
			let categories = [];
			let names = [];
			let index = 0;

			if (cartItems.length > 0) {
				for (let i in state.cartItems) {
					names.push(state.cartItems[i].name);
					if (!categories.length > 0 || !categories.find(e => e === state.cartItems[i].category)) {
						categories.push(state.cartItems[i].category);
					}
				}

				for (let i in names) {
					if (action.payload.category === categories[i] && action.payload.name === names[i]) {
						index = undefined; // disallow adding to cart
						break; // exact match, already in cart
					} else {
						i++;
						index = i; // same category, insert after
					}
				}

				index && cartItems.splice(index, 0, { ...action.payload, id: index, cart: 1 });
			} else {
				cartItems = [...state.cartItems, { ...action.payload, id: 0, cart: 1 }];
			}
			// const addItem = !state.cartItems.find(item => item.id === action.payload.id && item.size === action.payload.size)
			// 	? [...state.cartItems, { ...action.payload, cart: 1 }]
			// 	: [...state.cartItems];
			return {
				...state,
				cartItems: [...cartItems],
				...sumItems([...cartItems]),
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
				...sumItems(state.cartItems.filter(item => item.id !== action.payload.id && item.size !== action.payload.size)),
				cartItems: [
					...state.cartItems.filter(item => item.id !== action.payload.id && item.size !== action.payload.size),
				],
			};
		case 'INCREASE':
			const addMore = state.cartItems.map(item =>
				item.name === action.payload.name && action.payload.cart * action.payload.bulk < action.payload.quantity
					? { ...item, cart: item.cart + 1 }
					: item
			);
			return {
				...state,
				cartItems: addMore,
				...sumItems(addMore),
			};
		case 'DECREASE':
			const oneLess = state.cartItems.map(item =>
				item.id === action.payload.id && item.size === action.payload.size && action.payload.cart > 0
					? { ...item, cart: item.cart - 1 }
					: item
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
