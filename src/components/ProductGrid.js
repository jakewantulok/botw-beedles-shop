import React, { useContext } from 'react';
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
`;

const ProductGrid = () => {
	const { products } = useContext(ProductContext);
	const renderProducts = products.map(product => <ProductItem key={product.id} product={product} />);
	return (
		<>
			<div className="row">
				<div className="col-sm-8">
					<div className="py-3">{products.length} Products</div>
				</div>
			</div>
			<Products>{renderProducts}</Products>
		</>
	);
};

export default ProductGrid;
