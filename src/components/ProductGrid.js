import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { ProductContext } from '../context/ProductContext';

const Products = styled.div`
	display: flex;
	flex-wrap: wrap;
	background: rgba(22, 22, 29, 90%);
	border-radius: 15px;
	padding: 15px;
	margin: 15px 0;
	box-shadow: 5px 5px 10px #16161d50;
`;

const Filter = styled.div`
	& button {
		margin-right: 15px;
	}
`;

const ProductGrid = () => {
	const { products } = useContext(ProductContext);

	let filtersArr = [...products.map(product => product.category)];

	const filters = [...new Set(filtersArr)].map((option, i) => (
		<button key={i} className="btn btn-dark" onClick={() => handleFilter(option)}>
			{option}
		</button>
	));

	const [filter, handleFilter] = useState('All');

	const filterProducts = products.filter(product => filter === product.category);

	const renderProducts =
		filter !== 'All'
			? filterProducts.map(product => <ProductItem key={product.id} product={product} />)
			: products.map(product => <ProductItem key={product.id} product={product} />);

	return (
		<>
			<div className="row">
				<div className="col-sm-8">
					<div className="py-3">
						<Filter>
							<button className="btn btn-dark" onClick={() => handleFilter('All')}>
								All
							</button>
							{filters}
							<span>
								{renderProducts.length > 1 ? renderProducts.length + ' Products' : renderProducts.length + ' Product'}
							</span>
						</Filter>
					</div>
				</div>
			</div>
			<Products>{renderProducts}</Products>
		</>
	);
};

export default ProductGrid;
