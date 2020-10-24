import React, { Component } from 'react';

import { discount } from '../functions/discount';

import Options from './Options';
import SafeATC from './SafeATC';

import styled from 'styled-components';

const Product = styled.div`
	& > div {
		margin: 15px 0px;
		padding: 15px;
		border-radius: 15px;
		transition: background-color 0.5s;
		transition: border 0.5s;
		&:hover {
			background-color: rgba(22, 22, 29, 50%);
			transition: background-color 0.25s;
			transition: border 0.25s;
		}
	}
`;

const ProductHeader = styled.div`
	display: flex;
	flex-flow: wrap;
	align-items: center;
`;

const ProductTitle = styled.div`
	max-width: 150px;
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

const Sale = styled.div`
	margin-bottom: 10px;
`;

const Price = styled.span`
	padding-right: 10px;
`;

class ProductItem extends Component {
	constructor(props) {
		super();
		this.state = {
			name: props.product.name + ' ' + props.product.sale[0].name,
			category: props.product.category,
			subcategory: props.product.subcategory,
			photo: props.product.photo,
			description: props.product.description,
			originalPrice: props.product.sale[0].price,
			price: props.product.sale[0].price,
			quantity: props.product.quantity,
			bulk: props.product.sale[0].bulk,
			cart: 0,
		};
	}

	render() {
		const { product } = this.props;

		const selectOption = option => {
			this.setState(prevState => ({
				...prevState,
				name: product.name + ' ' + option.name,
				category: product.category,
				photo: product.photo,
				description: product.description,
				price: option.price,
				bulk: option.bulk,
				cart: prevState.cart,
			}));
		};

		return (
			<Product key={product.id} hidden={!product.price} className="col-12 col-sm-6 col-md-6 col-lg-4">
				<div>
					<ProductHeader>
						<ProductImg>
							<img src={'./img/products/' + product.photo} alt={product.name} />
						</ProductImg>
						<ProductTitle>
							<h5>{this.state.name}</h5>
						</ProductTitle>
					</ProductHeader>

					<Sale>
						<img src="./img/green_rupee.png" className="rupee-icon" alt="rupee-icon" width={20} />
						<Price>{this.state.price}</Price>
						<span hidden={discount(this.state, product.price) <= 0} className="text-info font-italic">
							{discount(this.state, product.price)}% Off!
						</span>
					</Sale>

					<Options thisState={this.state} prod={product} select={selectOption} />

					<SafeATC item={this.state} />
				</div>
			</Product>
		);
	}
}

export default ProductItem;
