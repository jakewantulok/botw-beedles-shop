// const productStorage = viewItem => localStorage.setItem('product', JSON.stringify(viewItem));
let defaultSumData = {
	cartCount: 0,
	overallCost: 0,
	overallReducedCost: 0,
	overallSavings: 0,
	overallSavingsPercent: 0,
	subcategories: [],
};

export const sumCart = cartItems => {
	localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems : []));

	let sumData = {
		cartCount: cartItems.length,
		overallCost: 0,
		overallReducedCost: 0,
		overallSavings: 0,
		overallSavingsPercent: 0,
		subcategories: [],
	};

	if (!cartItems.length) {
		localStorage.setItem('sumItems', JSON.stringify(defaultSumData));
		return sumData;
	}

	const subcategories = [...new Set([...cartItems.map(product => product.subcategory)])];

	for (let i in subcategories) {
		sumData.subcategories[i] = {
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

			sumData.subcategories[i].itemCount += itemCount;

			sumData.subcategories[i].totalCost += itemCount * cartItem.originalPrice;
			sumData.overallCost += sumData.subcategories[i].totalCost;

			sumData.subcategories[i].reducedCost += cartItem.cart * cartItem.price;
			sumData.overallReducedCost += sumData.subcategories[i].reducedCost;
		});

		sumData.subcategories[i].savings = sumData.subcategories[i].totalCost - sumData.subcategories[i].reducedCost;

		sumData.subcategories[i].savingsPercent = +(
			(((sumData.subcategories[i].savings * 100) / sumData.subcategories[i].totalCost) * 100) /
			100
		).toFixed(0);
	}

	sumData.overallSavings = sumData.overallCost - sumData.overallReducedCost;
	sumData.overallSavingsPercent = +((((sumData.overallSavings * 100) / sumData.overallCost) * 100) / 100).toFixed(0);

	localStorage.setItem('sumItems', JSON.stringify(sumData));

	return sumData;
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
				sumItems: { ...sumCart([...updatedCart]) },
			};
		case 'DECREASE':
			let putBack;
			updatedCart = [
				...cartItems.map(item => {
					if (item.name === payload.name && item.cart > 0) {
						putBack = item.quantity + payload.bulk;
						return {
							...item,
							cart: item.cart - 1,
							quantity: putBack,
						};
					} else {
						return item;
					}
				}),
			];
			updatedCart = [...updatedCart.filter(item => item.cart > 0)];
			updatedCart = syncQty(payload.subcategory, updatedCart, putBack);
			return {
				...state,
				cartItems: [...updatedCart],
				sumItems: { ...sumCart([...updatedCart]) },
			};
		case 'CHECKOUT':
			return {
				cartItems: [],
				checkout: true,
				sumItems: { ...defaultSumData },
			};
		case 'RESET':
			return {
				...state,
				cartItems: [...state.cartItems],
				checkout: false,
				sumItems: { ...sumCart(state.cartItems) },
			};
		case 'REMOVE_ITEM':
			return {
				...state,
				cartItems: [...state.cartItems.filter(item => item.name !== payload.name)],
				sumItems: { ...sumCart(state.cartItems.filter(item => item.name !== payload.name)) },
			};
		case 'CLEAR':
			localStorage.setItem('cart', JSON.stringify([]));
			localStorage.setItem('sumItems', JSON.stringify({ ...defaultSumData }));
			return {
				cartItems: [],
				sumItems: { ...defaultSumData },
			};
		default:
			console.error('invalid action: ', action);
	}
};
