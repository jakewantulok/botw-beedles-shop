import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Routes } from './Routes';
import Navigation from './components/Navigation/Navigation';
import * as serviceWorker from './serviceWorker';

import ProductsContextProvider from './context/ProductContext';
import CartContextProvider from './context/CartContext';

ReactDOM.render(
	<React.StrictMode>
		<ProductsContextProvider>
			<CartContextProvider>
				<Navigation />
				<Routes />
			</CartContextProvider>
		</ProductsContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
