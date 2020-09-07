import React, { Component } from 'react';
import FormatCurrency from './FormatCurrency';
import ATC from './ATC';
import QtyMsg from './QtyMsg';
import ClearItem from './ClearItem';

class ProductItem extends Component {
	constructor (props) {
		super(props);
		this.state = {
			id: props.product.id,
			name: props.product.name,
			price: props.product.price,
			photo: props.product.photo,
			size: undefined,
			cart: 0
		}
	}

	render () {
		const { product } = this.props;

		const selectSize = item => {
			this.setState(prevState => ({
				...prevState,
				sale: item.sale,
				size: item.size,
				quantity: item.quantity,
				cart: prevState.cart
			}));
		};

		const sizeBtns = product.inventory.map(item => (
			<button 
				key={item.size}
				className={this.state.size === item.size ? 'btn btn-dark' : 'btn btn-outline-dark'}
				onClick={() => selectSize(item)}>{item.size}</button>
		));

		const changeBtn = () => {
				if (typeof this.state.quantity === 'number') {
					if (this.state.quantity > 0) {
						return (<ATC item={this.state} />);
					} else {
						return (<button disabled={true} className='btn btn-outline-danger'>SOLD OUT</button>);
					}
				} else {
					return (<button disabled={true} className="btn btn-outline-dark">Select A Size</button>)
				}
		};

		return (
			<div key={product.id}>
				<p>{product.name}</p>
				<p>
					<span 
						style={ { textDecoration: this.state.sale < product.price && 'line-through' } }
						className={this.state.sale < product.price ? 'text-muted' : ''}>
						{FormatCurrency(product.price)}
					</span>
					<span 
						className='text-success'
						hidden={this.state.sale === product.price}>
						{typeof this.state.sale === 'number' && FormatCurrency(this.state.sale)}
					</span>
				</p>
				<div>
					{sizeBtns}
				</div>
				<div>
					{changeBtn()}
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
