export const InCart = (item, cartItems, type = 'bool') => {
  switch (type) {
    case 'bool' : 
    case 'boolean' :
      return (cartItems.find(cartItem => cartItem.id === item.id && cartItem.size === item.size) ? true : false);
    case 'cart' :
      return (cartItems.find(cartItem => cartItem.id === item.id && cartItem.size === item.size).cart || 0);
    default :
      return false;
  }
};
