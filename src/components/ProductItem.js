import React, { Component } from 'react';
import FormatCurrency from './FormatCurrency';
import ATC from './ATC';

class ProductItem extends Component {
	constructor (props) {
		super(props);
		this.state = {}
	}

	render () {
		const { product } = this.props;

		const selectSize = item => {
			this.setState({
				size: item.size,
				quantity: item.quantity
			});
		};

		const sizeBtns = product.inventory.map(item => (
			<button 
				key={item.size}
				className={this.state.size === item.size ? 'btn btn-dark' : 'btn btn-outline-dark'}
				onClick={() => selectSize(item)}>{item.size}</button>
		));

		return (
			<div key={product.id}>
				<p>{product.name}</p>
				<p>{FormatCurrency(product.price)}</p>
				<div>
					{sizeBtns}
				</div>
				<p>
					{/[1-9]/.test(this.state.quantity) && <ATC item={this.state} />}
					<span hidden={typeof this.state.quantity === 'number' ? false : true} className={this.state.quantity === 0 ? 'qtyMsg text-danger' : 'qtyMsg'}>{this.state.quantity === 0 ? 'SOLD OUT' : `QTY: ${this.state.quantity}`}</span>
				</p>
			</div>
		);
	}
}

export default ProductItem;
