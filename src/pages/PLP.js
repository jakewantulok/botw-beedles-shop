import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { CartContext } from '../context/CartContext';

export const Product = () => {
	const { viewItem } = useContext(CartContext);
	const sizeBtns = () =>
		viewItem.sizes.map(s => {
			return s.inventory > 0 ? (
				<button className="btn btn-outline-primary btn-sm" key={s.size}>
					{s.size}
				</button>
			) : null;
		});
	return (
		<Layout title={viewItem.name} description={viewItem.name}>
			<>
				<div className="text-center mt-5">
					<h1>PDP</h1>
					<p>This is the PDP.</p>
					<p>{viewItem.name}</p>
					{sizeBtns()}
				</div>
			</>
		</Layout>
	);
};
