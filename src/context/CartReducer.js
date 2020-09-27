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
	const handleInventory = (cartItems, payload, actionType = '') => {
		if (!cartItems && !payload) return;

		let updateCart;
		let num;
		let qty;

		// detrimine num & qty if item is already in cart
		for (let i in cartItems) {
			if (cartItems[i].name === payload.name) {
				num = cartItems[i].cart;
			}
			if (cartItems[i].name.replace(/x[1-9]/, '') === payload.name.replace(/x[1-9]/, '')) {
				qty = cartItems[i].quantity;
				break;
			}
		}
	
		if (typeof num === 'undefined')
			num = 1;

		if (typeof qty === 'undefined')
			qty = payload.quantity;

		
		// change the target's cart number and update the quantity
		switch (actionType) {
			case 'INCREASE':
			case 'ADD_ITEM':
				// check if it's possible to add this bulk amount against the quantity
				if (num * payload.bulk <= qty) {
					qty -= payload.bulk; // this is the new qty for all items that are the same product
					updateCart = cartItems.map(item =>
						item.name === payload.name
							? {
									...item,
									cart: payload.cart + 1, // now it will show this was added to the cart
									quantity: qty, // newly updated quantity, still need to update the rest
							  }
							: item.name.replace(/x[1-9]/, '') === payload.name.replace(/x[1-9]/, '')
							? {
									...item,
									quantity: qty, // newly updated quantity for the all items that are the same product
							  }
							: item
					);
				} else {
					updateCart = cartItems;
				}
				updateCart = updateCart.filter(item => item.cart > 0); // if adding to cart would surpass the quantity, remove from cart
				debugger;
				break;
			case 'DECREASE':
				qty += payload.bulk;
				updateCart = cartItems.map(item =>
					item.name === payload.name && item.cart > 0
						? {
								...item,
								cart: payload.cart - 1,
								quantity: qty,
						  }
						: item
				);
				updateCart = updateCart.filter(item => item.cart <= 0); // if cart already reached 0, remove from cart
				break;
			default:
				num = payload.quantity;
				updateCart = cartItems;
		}

		// use the updated quantity of the target to update quanities of any matching products in cart
		updateCart = updateCart.map(item =>
			item.name.replace(/x[1-9]/) === payload.name.replace(/x[1-9]/)
				? {
						...item,
						quantity: qty,
				  }
				: item
		);

		return updateCart;
	};

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

				index && cartItems.splice(index, 0, { ...action.payload, id: index });
			} else {
				cartItems = [...state.cartItems, { ...action.payload, id: 0 }];
			}

			let addToCart = [...handleInventory(cartItems, action.payload, action.type)];

			return {
				...state,
				cartItems: [...addToCart],
				...sumItems([...addToCart]),
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
				...sumItems(state.cartItems.filter(item => item.name !== action.payload.name)),
				cartItems: [...state.cartItems.filter(item => item.name !== action.payload.name)],
			};
		case 'INCREASE':
		case 'DECREASE':
			let moreOrLess = [...handleInventory(state.cartItems, action.payload, action.type)];
			return {
				...state,
				cartItems: [...moreOrLess],
				...sumItems([...moreOrLess]),
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
