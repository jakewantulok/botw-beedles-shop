import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const QtyMsg = props => {
  const { cartItems } = useContext(CartContext);
  const { item } = props;
  const inCart = item => !!cartItems.find(obj => obj.id === item.id);
  return (
    <span hidden={item.quantity > 0 && item.quantity <= 15 ? false : true} className='sizeQty text-danger'>
			ONLY {inCart(item) ? item.quantity - (cartItems.find(obj => obj.id === item.id).cart) : item.quantity} LEFT!
    </span>
  );

};

export default QtyMsg;
