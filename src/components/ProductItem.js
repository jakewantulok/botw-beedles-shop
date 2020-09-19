import React, { Component } from 'react';
import styled from 'styled-components';
import ATC from './ATC';
import QtyMsg from './QtyMsg';

const Btn = styled.button`
	margin: 10px 10px 10px 0;
`;

const Price = styled.span`
	padding-right: 10px;
`;

const Product = styled.div`
	margin: 15px 0;
	padding: 15px;
	border: 1px solid #16161d00;
	border-radius: 15px;
	transition: background-color 0.5s;
	transition: border 0.5s;
	&:hover {
		background-color: #16161d;
		border: 1px solid grey;
		transition: background-color 0.25s;
		transition: border 0.25s;
	}
`;

class ProductItem extends Component {
	constructor(props) {
		super();
		this.state = {
			name: props.product.name + ' ' + props.product.sale[0].name,
			category: props.product.category,
			photo: props.product.photo,
			description: props.product.description,
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

		const optionBtns = product.sale.map((option, i) => (
			<Btn
				key={i}
				className={
					this.state.name === product.name + ' ' + option.name ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'
				}
				style={{ minWidth: 41 }}
				onClick={() => selectOption(option)}>
				{option.name}
			</Btn>
		));

		return (
			<Product key={product.id} hidden={!product.price} className="col-12 col-sm-6 col-md-4 col-lg-3">
				<div>
					<h3>{this.state.name}</h3>
					<img src={'./img/products/' + product.photo} alt={product.name} width={96} />
					<div>
						<img src="./img/green_rupee.png" className="rupee-icon" alt="rupee-icon" width={20} />
						<Price>{this.state.price}</Price>
						<span
							hidden={100 - ((this.state.price / this.state.bulk / product.price) * 100).toFixed(0) <= 0}
							className="text-light font-italic">
							{100 - ((this.state.price / this.state.bulk / product.price) * 100).toFixed(0)}% Off!
						</span>
					</div>
					<div>{product.sale.length > 1 && optionBtns}</div>
					<div>
						{this.state.name ? (
							<ATC item={this.state} />
						) : (
							<Btn disabled={true} className="btn btn-dark">
								SELECT AN OPTION
							</Btn>
						)}
						<QtyMsg item={this.state} />
					</div>
				</div>
			</Product>
		);
	}
}

export default ProductItem;
