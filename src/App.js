import React, { useMemo, useState } from 'react';
import Navigation from './components/Navigation';
import { Routes } from './Routes';
import ProductsContextProvider from './context/ProductContext';
import CartContextProvider from './context/CartContext';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/global';
import { lightTheme, darkTheme } from './components/theme';

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
					<Routes />
				</CartContextProvider>
			</ProductsContextProvider>
		</ThemeProvider>
	);
};

export default App;