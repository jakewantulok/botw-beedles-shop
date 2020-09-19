import React, { Component } from 'react';
import styled from 'styled-components';
import ATC from './ATC';
import QtyMsg from './QtyMsg';

const Btn = styled.button`
	margin: 10px 10px 10px 0;
`;

const Options = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const ProductHeader = styled.div`
	display: flex;
	flex-flow: wrap;
	align-items: center;
`;

const Option = styled.button`
	display: flex;
	justify-content: center;
	margin: 0 8px 0 0;
	width: 28px;
	height: 28px;
	font-size: 12px;
`;

const Price = styled.span`
	padding-right: 10px;
`;

const Product = styled.div`
	& > div {
		margin: 15px 0px;
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
	}
`;

const ProductTitle = styled.div`
	max-width: 115px;
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

const DescTitle = styled.div`
	position: relative;
	& span {
		position: absolute;
		top: -6px;
		font-size: 12px;
	}
`;

const Desc = styled.div`
	position: relative;
	top: 12px;
	max-width: 200px;
	height: 30px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 12px;
	font-style: italic;
	& span:nth-child(2) {
		line-height: 0;
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
			<Option
				key={i}
				className={
					option.name
						? this.state.name === product.name + ' ' + option.name
							? 'btn btn-sm btn-dark'
							: 'btn btn-sm btn-light'
						: 'btn btn-sm'
				}
				onClick={() => selectOption(option)}>
				<span>{option.name}</span>
			</Option>
		));

		return (
			<Product key={product.id} hidden={!product.price} className="col-12 col-sm-6 col-md-4 col-lg-3">
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
						<span
							hidden={100 - ((this.state.price / this.state.bulk / product.price) * 100).toFixed(0) <= 0}
							className="text-info font-italic">
							{100 - ((this.state.price / this.state.bulk / product.price) * 100).toFixed(0)}% Off!
						</span>
					</Sale>
					{product.sale.length > 1 ? (
						<Options>{optionBtns}</Options>
					) : (
						<>
							<DescTitle>
								<span>Description: </span>
							</DescTitle>
							<Desc>
								<span>{product.description}</span>
							</Desc>
						</>
					)}
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
