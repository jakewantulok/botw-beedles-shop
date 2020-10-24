import React, { useState } from 'react';
import { discount } from '../functions/discount';
import { RupeeIcon } from './Icons';
import Options from './Options';
import SafeATC from './SafeATC';
import styled from 'styled-components';

const ProductWrapper = styled.div`
	padding: 0;
`;

const Product = styled.div`
	height: calc(100% - 15px);
	padding: 15px;
	border-radius: 15px;
	margin-right: 15px;
	border: 1px solid transparent;
	transition: background-color 0.5s;
	transition: border 0.5s;
	&:hover {
		border: 1px solid white;
		background-color: rgba(22, 22, 29, 50%);
		transition: background-color 0.25s;
		transition: border 0.25s;
	}
`;

const ProductHeader = styled.div`
	display: flex;
	flex-flow: wrap;
	align-items: center;
`;

const ProductImg = styled.div`
	width: 75px;
	height: 75px;
	margin: 0 15px 15px 0;
	position: relative;
	& img {
		position: absolute;
		width: 90px;
		top: -5px;
		left: -5px;
	}
`;

const ProductTitle = styled.div`
	max-width: 150px;
	margin-bottom: 15px;
`;

const Price = styled.span`
	padding-right: 10px;
`;

const ProductItem = ({ product }) => {
	const initialState = {
		name: product.name + ' ' + product.sale[0].name,
		category: product.category,
		subcategory: product.subcategory,
		photo: product.photo,
		description: product.description,
		originalPrice: product.price,
		price: product.sale[0].price,
		quantity: product.quantity,
		bulk: product.sale[0].bulk,
		cart: 0,
	};

	const [optionSelected, selectOption] = useState(initialState);

	return (
		<ProductWrapper key={product.id} hidden={!product.price} className="col-12 col-sm-6 col-md-6 col-lg-4">
			<Product>
				<ProductHeader>
					<ProductImg>
						<img src={'./img/products/' + product.photo} alt={product.name} />
					</ProductImg>

					<ProductTitle>
						<h5>{optionSelected.name}</h5>

						<Price>
							<RupeeIcon />
							{optionSelected.price}
						</Price>

						<span hidden={discount(optionSelected, product.price) <= 0} className="text-info font-italic">
							{discount(optionSelected, product.price)}% Off!
						</span>
					</ProductTitle>
				</ProductHeader>

				{product.sale.length > 1 ? (
					<>
						<Options productState={optionSelected} productInfo={product} select={selectOption} />
						<SafeATC item={optionSelected} />
					</>
				) : (
					<>
						<SafeATC item={optionSelected} />
						<Options productState={optionSelected} productInfo={product} select={selectOption} />
					</>
				)}
			</Product>
		</ProductWrapper>
	);
};

export default ProductItem;
