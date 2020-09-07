import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ClearItem = props => {
  const { item, children } = props;
  const { removeProduct, cartItems } = useContext(CartContext);
  const hideOnClear = () => (!cartItems.find(obj => obj.id === item.id));
  return (
    <button hidden={hideOnClear()} onClick={() => removeProduct(item)} className='btn btn-sm text-dark'>{ children || 'remove' }</button>
  );
};

export default ClearItem;
