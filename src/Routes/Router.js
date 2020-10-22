import React from 'react';
import { Routes } from './Routes';
import Layout from '../components/Layout';
import { BrowserRouter } from 'react-router-dom';

export const Router = () => (
	<Layout>
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	</Layout>
);
