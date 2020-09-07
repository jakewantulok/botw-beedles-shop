import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { PlusIcon, MinusIcon, TrashIcon } from './Icons';
import FormatCurrency from './FormatCurrency';
import ClearItem from './ClearItem';

const CartItem = ({ product }) => {
	const { increase, decrease, removeProduct } = useContext(CartContext);

	return (
		<div className="row no-gutters py-2">
			<div className="col-sm-2 p-2">
			</div>
			<div className="col-sm-4 p-2">
				<h5 className="mb-1">{product.name}</h5>
				<p className="mb-1">
				<span 
						style={ { textDecoration: product.sale < product.price && 'line-through' } }
						className={product.sale < product.price ? 'text-muted' : ''}>
						{FormatCurrency(product.price)}
					</span>
					<span 
						className='text-success'
						hidden={product.sale === product.price}>
						{typeof product.sale === 'number' && FormatCurrency(product.sale)}
					</span>
				</p>
			</div>
			<div className="col-sm-2 p-2">
				<p className="mb-0">
					<span>Size: {product.size}</span>
				</p>
				<p className="mb-0">
					Qty:{product.cart}
					<ClearItem item={product}>
						<TrashIcon width={15} />
					</ClearItem>
				</p>
			</div>
			<div className="col-sm-4 p-2">
				<button 
					onClick={() => increase(product)} 
					className={product.cart !== product.quantity ? 'btn btn-primary btn-sm mr-2 mb-1' : 'btn btn-light btn-sm mr-2 mb-1'}
					disabled={product.cart === product.quantity}>
					<PlusIcon width={20} />
				</button>

				{product.cart > 1 && (
					<button onClick={() => decrease(product)} className="btn btn-danger btn-sm mb-1">
						<MinusIcon width={20} />
					</button>
				)}

				{product.cart === 1 && (
					<button onClick={() => removeProduct(product)} className="btn btn-danger btn-sm mb-1">
						<TrashIcon width={20} />
					</button>
				)}

			</div>
		</div>
	);
};

export default CartItem;
