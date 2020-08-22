import React from 'react';
import { Layout } from './components/Layout/Layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Product } from './pages/Product';
import { Missing } from './pages/Missing';

export const Routes = () => (
	<Layout>
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/cart" component={Cart} />
				<Route exact path="/product" component={Product} />
				<Route component={Missing} />
			</Switch>
		</Router>
	</Layout>
);
