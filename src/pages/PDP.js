import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { ProductContext } from '../context/ProductContext';

export const PDP = () => {
	const { products } = useContext(ProductContext);
	const { productPath } = useParams();
	const [product] = products.filter(prod => prod.pathname === productPath);
	return (
		<Layout title={product.name} description={product.name}>
			<>
				<div className="text-center mt-5">
					<h1>PDP</h1>
					<p>This is the PDP.</p>
					<p>{product.name}</p>
				</div>
			</>
		</Layout>
	);
};
