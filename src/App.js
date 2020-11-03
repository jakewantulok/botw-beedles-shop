import React, { useMemo, useState } from 'react';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/global';
import { lightTheme, darkTheme } from './components/theme';

import BeedleContextProvider from './context/BeedleContext';
import ProductsContextProvider from './context/ProductContext';
import CartContextProvider from './context/CartContext';

import Navigation from './components/Navigation';
import { Router } from './Routes/Router';

const App = () => {
	!localStorage.getItem('theme') && localStorage.setItem('theme', JSON.stringify('light'));
	const initMode = localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : 'light';

	const [mode, setMode] = useState(initMode);
	const handleThemeChange = () => {
		setMode(mode === 'dark' ? 'light' : 'dark');
		localStorage.setItem('theme', JSON.stringify(mode === 'dark' ? 'light' : 'dark'));
	};
	const toggleTheme = useMemo(() => mode === 'dark', [mode]);

	return (
		<ThemeProvider theme={!toggleTheme ? lightTheme : darkTheme}>
			<GlobalStyles />
			<BeedleContextProvider>
			<ProductsContextProvider>
				<CartContextProvider>
					<Navigation themeHandler={handleThemeChange} theme={!toggleTheme ? 'light' : 'dark'} />
					<Router />
				</CartContextProvider>
			</ProductsContextProvider>
			</BeedleContextProvider>
		</ThemeProvider>
	);
};

export default App;
