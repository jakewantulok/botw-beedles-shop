import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../context/CartContext';
import { PlusIcon, MinusIcon, TrashIcon, RupeeIcon } from './Icons';

const Item = styled.div`
	margin: 15px -15px;
	padding: 15px;
	border: 1px solid white;
	border-radius: 15px;
	transition: background-color 0.5s;
	transition: border 0.5s;
	background-color: rgba(22, 22, 29, 50%);
	& > div {
		display: flex;
		align-items: center;
	}
}
`;

const CartItem = ({ product }) => {
	const { increase, decrease, removeProduct, cartItems, sumItems } = useContext(CartContext);
	const { subcategories } = sumItems;
	const filtered =
		subcategories.length > 0 ? subcategories.filter(cartItem => cartItem.subcategory === product.subcategory) : [];

	const count = filtered && filtered.length > 0 ? filtered[0].itemCount : 0;

	// this is a way to check ahead if optionSelected can in fact be added to cart
	const testObj = {
		itemName: product.name,
		itemQuantity: product.quantity,
		itemBulk: product.bulk,
		inCart: count,
		expression: 'item.quantity - item.bulk',
		result: product.quantity - product.bulk,
		cartItems: cartItems,
	};

	if (/Bomb/.test(product.name)) console.table(testObj);

	return (
		<Item className="row no-gutters py-2">
			<div className="col-2 p-2">
				<img src={'./img/products/' + product.photo} alt={product.name} width={60} />
			</div>

			<div className="col-4 p-2">
				<h4 className="mb-1">{product.name}</h4>
			</div>

			<div className="col-3 p-2">
				<div style={{ width: '100px' }}>
					<h4 className="mb-0">{product.cart}</h4>
				</div>
				<div>
					<button
						onClick={() => increase(product)}
						className={
							product.quantity - product.bulk < 0
								? 'btn text-secondary ml-1 btn-sm'
								: 'btn text-primary btn-sm'
						}
						disabled={product.quantity - product.bulk < 0}>
						<PlusIcon width={20} />
					</button>

					{product.cart > 1 && (
						<button onClick={() => decrease(product)} className="btn text-danger btn-sm">
							<MinusIcon width={20} />
						</button>
					)}

					{product.cart === 1 && (
						<button onClick={() => removeProduct(product)} className="btn text-danger btn-sm">
							<TrashIcon width={20} />
						</button>
					)}
				</div>
			</div>

			<div className="col-3 p-2">
				<span className="text-success" hidden={product.sale === product.price}>
					{typeof product.sale === 'number' && product.sale}
				</span>
				<h4
					style={{ textDecoration: product.sale < product.price && 'line-through' }}
					className={product.sale < product.price ? 'text-muted mb-0' : 'mb-0'}>
					<RupeeIcon size="35px" />
					{product.price}
				</h4>
			</div>
		</Item>
	);
};

export default CartItem;
