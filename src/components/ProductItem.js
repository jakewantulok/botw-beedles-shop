import React, { Component } from 'react';
import styled from 'styled-components';
import ATC from './ATC';
import QtyMsg from './QtyMsg';
import ClearItem from './ClearItem';

const Btn = styled.button`
	margin: 10px 10px 10px 0;
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
				className={this.state.name === product.name + ' ' + option.name ? 'btn btn-dark' : 'btn btn-outline-dark'}
				onClick={() => selectOption(option)}>
				{option.name}
			</Btn>
		));

		return (
			<div key={product.id} hidden={!product.price}>
				<h3>{this.state.name}</h3>
				<img src={'./img/products/' + product.photo} alt={product.name} width={96} />
				<div>
					<img src="./img/green_rupee.png" className="rupee-icon" alt="rupee-icon" width={20} />
					<Price>{this.state.price}</Price>
					<span
						hidden={100 - ((this.state.price / this.state.bulk / product.price) * 100).toFixed(0) <= 0}
						className="text-success font-italic">
						{100 - ((this.state.price / this.state.bulk / product.price) * 100).toFixed(0) + '% Off!'}
					</span>
				</div>
				<div>{optionBtns}</div>
				<div>
					{this.state.name ? (
						<ATC item={this.state} />
					) : (
						<Btn disabled={true} className="btn btn-outline-dark">
							SELECT A SIZE
						</Btn>
					)}
					<QtyMsg item={this.state} />
				</div>
				<div>
					<ClearItem item={this.state} />
				</div>
			</div>
		);
	}
}

export default ProductItem;
