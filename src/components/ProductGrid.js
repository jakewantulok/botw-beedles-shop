import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { ProductContext } from '../context/ProductContext';
import { CloseIcon } from './Icons';

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
		<button key={i} className="btn btn-dark" onClick={() => handleFilterSelect(option)}>
			{option}
		</button>
	));

	const [filter, handleFilter] = useState('All');

	const filterProducts = products.filter(product => filter === product.category);

	const renderProducts =
		filter !== 'All'
			? filterProducts.map(product => <ProductItem key={product.id} product={product} />)
			: products.map(product => <ProductItem key={product.id} product={product} />);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleFilterSelect = str => {
		handleFilter(str);
		handleClose();
	};

	return (
		<>
			<div className="row">
				<div className="col-sm-8">
					<div className="py-3">
						<Filter>
							<Button variant="primary" onClick={handleShow}>
								Filter
							</Button>
							<span>
								{renderProducts.length > 1 ? renderProducts.length + ' Products' : renderProducts.length + ' Product'}
							</span>
							<Button variant="secondary" hidden={filter === 'All'} onClick={() => handleFilter('All')}>
								<CloseIcon width={22} color={'white'} />
								{filter}
							</Button>
						</Filter>
						<Modal show={show} onHide={handleClose} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
							<Modal.Header>
								<Modal.Title>Filter Products By Category</Modal.Title>
								<Button variant="secondary" onClick={handleClose}>
									<CloseIcon width={22} color={'white'} />
								</Button>
							</Modal.Header>
							<Modal.Body>
								<button className="btn btn-dark" onClick={() => handleFilterSelect('All')}>
									All
								</button>
								{filters}
							</Modal.Body>
						</Modal>
					</div>
				</div>
			</div>
			<Products>{renderProducts}</Products>
		</>
	);
};

export default ProductGrid;
