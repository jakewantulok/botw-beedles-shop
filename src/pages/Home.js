import React from 'react';
import Layout from '../components/Layout';
import ProductsGrid from '../components/ProductGrid';

export const Home = () => (
	<Layout title="Store" description="This is the Store page">
		<div>
			<div className="text-center mt-5">
				<h1>Store</h1>
			</div>
			<ProductsGrid />
		</div>
	</Layout>
);
