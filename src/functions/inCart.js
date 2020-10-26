/**
 * inCart ~ Check to see if item is in cart already
 * @param {object} item the item to check against cart items
 * @param {array} cartItems array of objects currently in cart
 * @param {string} type return a boolean ('bool') in cart or how many ('cart')
 */
export const inCart = (item, cartItems) => {
	const filteredCart = !!cartItems && cartItems.filter(cartItem => cartItem.category === item.category);

	let num;
	!!cartItems && filteredCart.forEach(cartItem => (num += cartItem.cart * cartItem.bulk));

	return num ? { confirmed: true, cart: num } : { confirmed: false, cart: 0 };
};
