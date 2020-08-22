import React, { useContext } from 'react';
import { PlusIcon, MinusIcon, TrashIcon } from '../../components/Icons/Icons';
import { CartContext } from '../../context/CartContext';
import formatCurrency from '../FormatCurrency/FormatCurrency';


const CartItem = ({product}) => {

    const { increase, decrease, removeProduct } = useContext(CartContext);
    const iconSize = '20';

    const smIconStyle = {
        position: 'relative',
        top: -2,
        padding: 0,
        paddingLeft: 10
    };

    return ( 
        <div className="row no-gutters py-2">
            <div className="col-sm-2 p-2">
                {/* <SetImg info={product} style={imgStyle} addClass='img-fluid d-block'/> */}
            </div>
            <div className="col-sm-4 p-2">
                <h5 className="mb-1">{product.name}</h5>
                <p className="mb-1">Price: {formatCurrency(product.price)} </p>
                
            </div>
            <div className="col-sm-2 p-2 text-center ">
                 <p className="mb-0">
                    <button onClick={() => removeProduct(product)} style={ { paddingTop: 0 } } className="btn">
                        Qty: {product.quantity}<span className="text-danger" style={ smIconStyle }><TrashIcon width={15}/></span>
                    </button>
                </p>
            </div>
            <div className="col-sm-4 p-2 text-right">
                 <button 
                 onClick={() => increase(product)}
                 className="btn btn-primary btn-sm mr-2 mb-1">
                     <PlusIcon width={iconSize}/>
                 </button>

                 {
                    product.quantity > 1 && 
                    <button onClick={() => decrease(product)} className="btn btn-danger btn-sm mb-1">
                        <MinusIcon width={iconSize}/>
                    </button>
                 }

                {
                    product.quantity === 1 &&
                    <button onClick={() => removeProduct(product)} className="btn btn-danger btn-sm mb-1">
                        <TrashIcon width={iconSize}/>
                    </button>
                 }
                 
            </div>
        </div>
     );
}
 
export default CartItem;
