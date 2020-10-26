// const productStorage = viewItem => localStorage.setItem('product', JSON.stringify(viewItem));

export const sumItems = cartItems => {
	localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems : []));

	let sumItems = {
		cartCount: cartItems.length,
		overallCost: 0,
		overallReducedCost: 0,
		overallSavings: 0,
		overallSavingsPercent: 0,
		subcategories: [],
	};

	const subcategories = [...new Set([...cartItems.map(product => product.subcategory)])];

	for (let i in subcategories) {
		sumItems.subcategories[i] = {
			subcategory: subcategories[i],
			itemCount: 0,
			totalCost: 0,
			reducedCost: 0,
			savings: 0,
			savingsPercent: 0,
		};
		const filteredItems = cartItems.filter(cartItem => cartItem.subcategory === subcategories[i]);
		filteredItems.forEach(cartItem => {
			const itemCount = cartItem.cart * cartItem.bulk;

			sumItems.subcategories[i].itemCount += itemCount;

			sumItems.subcategories[i].totalCost += itemCount * cartItem.originalPrice;
			sumItems.overallCost += sumItems.subcategories[i].totalCost;

			sumItems.subcategories[i].reducedCost += cartItem.cart * cartItem.price;
			sumItems.overallReducedCost += sumItems.subcategories[i].reducedCost;
		});

		sumItems.subcategories[i].savings = sumItems.subcategories[i].totalCost - sumItems.subcategories[i].reducedCost;

		sumItems.subcategories[i].savingsPercent = +(
			(((sumItems.subcategories[i].savings * 100) / sumItems.subcategories[i].totalCost) * 100) /
			100
		).toFixed(0);
	}

	sumItems.overallSavings = sumItems.overallCost - sumItems.overallReducedCost;

	sumItems.overallSavingsPercent = +((((sumItems.overallSavings * 100) / sumItems.overallCost) * 100) / 100).toFixed(0);

	localStorage.setItem('sum', JSON.stringify(sumItems));

	return sumItems;
};

export const CartReducer = (state, action) => {
	/**
	 * @description get the stock of a cart item matching payload + 1
	 * @param {object} payload item that is currently being added to cart
	 * @param {array} cart all of the items (objects) already in cart
	 * @returns number, item's stock + 1
	 */
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

	/**
	 * @description get the quantity of a cart item matching payload + item's bulk
	 * @param {object} payload item that is currently being added to cart
	 * @param {array} cart all of the items (objects) already in cart
	 * @returns number, item's quantity + item's bulk
	 */
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

	/**
	 * @description sync all items that share the same subcategory so quantity matches
	 * @param {object} subcategory payload's subcategoy to update any matches in cart
	 * @param {array} cart all of the items (objects) already in cart
	 * @param {number} stk item's stock + 1
	 * @param {number} qty item's quantity + item's bulk
	 * @returns array, updated cartItems array of objects
	 */
	const updateItem = (name, cart, stk, qty) => [
		...cart.map(item =>
			item.name === name // if exact match?
				? { ...item, cart: stk, quantity: qty } // then update cart & qty
				: { ...item }
		),
	];

	/**
	 * @description sync all items that share the same subcategory so quantity matches
	 * @param {object} subcategory payload's subcategoy to update any matches in cart
	 * @param {array} cart all of the items (objects) already in cart
	 * @param {number} qty item's quantity + item's bulk
	 * @returns array, updated cartItems array of objects
	 */
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

	let updatedCart = [];
	const cartItems = [...state.cartItems];
	const { type, payload } = action;
	const index = payload && cartItems.findIndex(item => item.name === payload.name); // search to see if item is in cart
	const stk = payload && getStk(payload, cartItems);
	const qty = payload && getQty(payload, cartItems);

	switch (type) {
		case 'INCREASE':
		case 'ADD_ITEM':
			if (qty >= 0 && payload) {
				// if adding to cart does not create an issue with inventory
				if (index === -1) {
					// if item was not found
					updatedCart = cartItems;
					updatedCart.push({ ...payload, id: cartItems.length, cart: stk, quantity: qty });
					updatedCart = syncQty(payload.subcategory, updatedCart, qty);
				} else {
					// if item was found
					updatedCart = updateItem(payload.name, cartItems, stk, qty);
					updatedCart = syncQty(payload.subcategory, updatedCart, qty);
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
			const putBack = qty + payload.bulk;
			updatedCart = [
				...cartItems.map(item =>
					item.name === payload.name && item.cart > 0
						? {
								...item,
								cart: item.cart - 1,
								quantity: putBack,
						  }
						: item
				),
			];
			updatedCart = [...updatedCart.filter(item => item.cart > 0)];
			updatedCart = syncQty(payload.subcategory, updatedCart, putBack);
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
				...sumItems(state.cartItems.filter(item => item.name !== payload.name)),
				cartItems: [...state.cartItems.filter(item => item.name !== payload.name)],
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
