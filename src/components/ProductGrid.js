import React, { useContext, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { FilterIcon } from './Icons';
import { ProductContext } from '../context/ProductContext';

const Products = styled.div`
	display: flex;
	flex-wrap: wrap;
	border: 1px solid white;
	background: rgba(22, 22, 29, 50%);
	border-radius: 15px;
	padding: 15px 15px 0 15px;
	box-shadow: 5px 5px 10px #16161d50;
`;

const Filter = styled.div`
	position: fixed;
	border: 1px solid white;
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

const ClearBtn = styled.button`
	font-size: 1rem;
	margin-left: 10px;
	color: white;
	background: none;
	border: none;
	font-style: italic;
	text-decoration: underline;
`;

const ProductGrid = () => {
	const { products } = useContext(ProductContext);
	const [filter, handleFilter] = useState('All');

	let filtersArr = [...products.map(product => product.category)];

	const dropdownFilters = [...new Set(filtersArr)].map((option, i) => (
		<Dropdown.Item key={i} onClick={() => handleFilter(option)}>
			{option}
		</Dropdown.Item>
	));

	const filterBtns = [...new Set(filtersArr)].map((option, i) => (
		<button
			key={i}
			className={filter === option ? 'btn btn-filter' : 'btn btn-outline-light'}
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
			<div className="mt-5">
				<h1>
					{filter}
					<ClearBtn hidden={filter === 'All'} onClick={() => handleFilter('All')}>
						clear
					</ClearBtn>
				</h1>
			</div>
			<div className="row">
				<div className="col-12 col-sm-12 col-md-12 col-lg-9">
					<Products>{renderProducts}</Products>
				</div>
				<div className="col-0 col-sm-0 col-md-0 col-lg-1" />
				<div className="col-0 col-sm-0 col-md-0 col-lg-2">
					<Filter>
						<Dropdown hidden>
							<Dropdown.Toggle variant="primary" id="dropdown-basic">
								{filter}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item onClick={() => handleFilter('All')}>All</Dropdown.Item>
								{dropdownFilters}
							</Dropdown.Menu>
						</Dropdown>
						<div className="text-center">
							<span>
								<FilterIcon size="15px" />{' '}
								{renderProducts.length > 1 ? renderProducts.length + ' Products' : renderProducts.length + ' Product'}
							</span>
						</div>
						<FilterOptions>
							<button
								className={filter === 'All' ? 'btn btn-filter' : 'btn btn-outline-light'}
								onClick={() => handleFilter('All')}>
								All
							</button>
							{filterBtns}
						</FilterOptions>
					</Filter>
				</div>
			</div>
		</>
	);
};

export default ProductGrid;
