import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { InCart } from './InCart';

const QtyMsg = props => {
  const { cartItems } = useContext(CartContext);
  const { item } = props;
  return (
    <span 
      hidden={item.quantity > 0 
        && InCart(item, cartItems) 
        && (item.quantity - InCart(item, cartItems, 'cart') <= 15 && item.quantity - InCart(item, cartItems, 'cart') > 0) 
        ? false : true} 
      className='sizeQty text-danger'>
			ONLY {InCart(item, cartItems) ? item.quantity - InCart(item, cartItems, 'cart') : item.quantity} LEFT!
    </span>
  );

};

export default QtyMsg;