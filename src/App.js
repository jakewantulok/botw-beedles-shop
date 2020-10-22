import React, { useMemo, useState } from 'react';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/global';
import { lightTheme, darkTheme } from './components/theme';

import ProductsContextProvider from './context/ProductContext';
import CartContextProvider from './context/CartContext';

import Navigation from './components/Navigation';
import { Router } from './Routes/Router';

const App = () => {
	const [mode, setMode] = useState('light');
	const handleThemeChange = () => setMode(mode === 'dark' ? 'light' : 'dark');
	const toggleTheme = useMemo(() => mode === 'dark', [mode]);

	return (
		<ThemeProvider theme={!toggleTheme ? lightTheme : darkTheme}>
			<GlobalStyles />
			<ProductsContextProvider>
				<CartContextProvider>
					<Navigation themeHandler={handleThemeChange} theme={!toggleTheme ? 'light' : 'dark'} />
					<Router />
				</CartContextProvider>
			</ProductsContextProvider>
		</ThemeProvider>
	);
};

export default App;
