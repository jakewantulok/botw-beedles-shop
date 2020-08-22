import React from 'react';
import Layout from '../components/Layout/Layout';
import ProductsGrid from '../components/ProductGrid/ProductGrid';

export const Home = () => (
	<Layout title="Store" description="This is the Store page">
		<div>
			<div className="text-center mt-5">
				<h1>Store</h1>
				<p>This is the Store Page.</p>
			</div>
			<ProductsGrid />
		</div>
	</Layout>
);
