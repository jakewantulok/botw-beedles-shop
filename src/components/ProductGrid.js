import React, { useContext, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { ProductContext } from '../context/ProductContext';
import { CloseIcon } from './Icons';

const Products = styled.div`
	display: flex;
	flex-wrap: wrap;
	background: rgba(22, 22, 29, 50%);
	border-radius: 15px;
	padding: 15px;
	margin: 15px 0;
	box-shadow: 5px 5px 10px #16161d50;
`;

const Filter = styled.div`
	position: fixed;
	background: rgba(22, 22, 29, 50%);
	border-radius: 15px;
	padding: 15px;
	& button {
		margin-right: 15px;
	}
	& .dropdown {
		display: inline-block;
	}
`;

const FilterOptions = styled.div`
	display: flex;
	flex-flow: column;
	& button {
		margin: 15px 0 0;
	}
`;

const ProductGrid = () => {
	const { products } = useContext(ProductContext);
	const [filter, handleFilter] = useState('All');

	let filtersArr = [...products.map(product => product.category)];

	// const filters = [...new Set(filtersArr)].map((option, i) => (
	// 	<Dropdown.Item key={i} onClick={() => handleFilter(option)}>
	// 		{option}
	// 	</Dropdown.Item>
	// ));

	const filterBtns = [...new Set(filtersArr)].map((option, i) => (
		<button
			key={i}
			className={filter === option ? 'btn btn-primary' : 'btn btn-outline-light'}
			onClick={() => handleFilter(option)}>
			{option}
		</button>
	));

	const filterProducts = products.filter(product => filter === product.category);

	const renderProducts =
		filter !== 'All'
			? filterProducts.map(product => <ProductItem key={product.id} product={product} />)
			: products.map(product => <ProductItem key={product.id} product={product} />);

	return (
		<>
			<div className="row">
				<div className="col-12 col-sm-2">
					<div className="py-3">
						<Filter>
							<span>Filter: </span>
							{/* <Dropdown>
								<Dropdown.Toggle variant="success" id="dropdown-basic"></Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item onClick={() => handleFilter('All')}>All</Dropdown.Item>
									{filters}
								</Dropdown.Menu>
							</Dropdown> */}

							<span>
								{renderProducts.length > 1 ? renderProducts.length + ' Products' : renderProducts.length + ' Product'}
							</span>
							<FilterOptions>
								{/* <Button variant="dark" hidden={filter === 'All'} onClick={() => handleFilter('All')}>
									<CloseIcon width={22} color={'white'} />
									{filter}
								</Button> */}
								<button
									className={filter === 'All' ? 'btn btn-primary' : 'btn btn-outline-light'}
									onClick={() => handleFilter('All')}>
									All
								</button>
								{filterBtns}
							</FilterOptions>
						</Filter>
					</div>
				</div>
				<div className="col-12 col-sm-1" />
				<div className="col-12 col-sm-9">
					<Products>{renderProducts}</Products>
				</div>
			</div>
		</>
	);
};

export default ProductGrid;
