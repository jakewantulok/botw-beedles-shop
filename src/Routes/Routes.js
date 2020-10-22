import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Cart } from '../pages/Cart';
import { PDP } from '../pages/PDP';
import { PLP } from '../pages/PLP';
import { Missing } from '../pages/Missing';

export const Routes = () => {
	const location = useLocation();
	const background = location.state && location.state.background;
	return (
		<Switch location={background || location}>
			<Route exact path="/" component={Home} />
			<Route exact path="/cart" component={Cart} />
			<Route exact path="/product" component={Home} />
			<Route path="/product/:productPath" component={PDP} />
			<Route component={Missing} />
		</Switch>
	);
};
