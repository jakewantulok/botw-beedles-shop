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
	const getStk = (payload, cart) => {
		let stk;

		for (let i in cart) {
			if (cart[i].name === payload.name) {
				stk = cart[i].cart;
				break;
			}
		}

		stk = typeof stk === 'undefined' ? 1 : stk + 1;

		return stk;
	};

	const getQty = (payload, cart) => {
		if (!payload) return;

		let qty;

		for (let i in cart) {
			if (cart[i].subcategory === payload.subcategory) {
				qty = cart[i].quantity;
				break;
			}
		}

		qty = typeof qty === 'undefined' ? payload.quantity - payload.bulk : qty - payload.bulk;

		return qty;
	};

	const syncQty = (subcategory, cart, qty) =>
		cart.length > 1
			? [
					...cart.map(
						item =>
							item.subcategory === subcategory // if similiar match?
								? { ...item, quantity: qty } // then update qty only
								: { ...item } // else no match, no change
					),
			  ]
			: [...cart];

	const updateItem = (name, cart, stk, qty) => [
		...cart.map(item =>
			item.name === name // if exact match?
				? { ...item, cart: stk, quantity: qty } // then update cart & qty
				: { ...item }
		),
	];

	let updatedCart = [];
	const cartItems = [...state.cartItems];
	const index = action.payload && cartItems.findIndex(item => item.name === action.payload.name); // search to see if item is in cart
	const stk = action.payload && getStk(action.payload, cartItems);
	const qty = action.payload && getQty(action.payload, cartItems);

	// WIP new switch case
	switch (action.type) {
		case 'INCREASE':
		case 'ADD_ITEM':
			if (qty >= 0) {
				// if adding to cart does not create an issue with inventory
				if (index === -1) {
					// if item was not found
					updatedCart = cartItems;
					updatedCart.push({ ...action.payload, id: cartItems.length, cart: stk, quantity: qty });
					updatedCart = syncQty(action.payload.subcategory, updatedCart, qty);
				} else {
					// if item was found
					updatedCart = updateItem(action.payload.name, cartItems, stk, qty);
					updatedCart = syncQty(action.payload.subcategory, updatedCart, qty);
				}
			} else {
				// if adding to cart does create an issue with inventory
				updatedCart = cartItems; // cartItems was not updated
				console.info('item could not be added, quantity has been reached: ' + qty);
			}
			return {
				...state,
				cartItems: [...updatedCart],
				...sumItems([...updatedCart]),
			};
		case 'DECREASE':
			const putBack = qty + action.payload.bulk;
			updatedCart = [
				...cartItems.map(item =>
					item.name === action.payload.name && item.cart > 0
						? {
								...item,
								cart: item.cart - 1,
								quantity: putBack,
						  }
						: item
				),
			];
			updatedCart = [...updatedCart.filter(item => item.cart > 0)];
			updatedCart = syncQty(action.payload.subcategory, updatedCart, putBack);
			return {
				...state,
				cartItems: [...updatedCart],
				...sumItems([...updatedCart]),
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
		case 'REMOVE_ITEM':
			return {
				...state,
				...sumItems(state.cartItems.filter(item => item.name !== action.payload.name)),
				cartItems: [...state.cartItems.filter(item => item.name !== action.payload.name)],
			};
		case 'CLEAR':
			return {
				cartItems: [],
				...sumItems([]),
			};
		default:
			console.error('invalid action: ', action);
	}
};
