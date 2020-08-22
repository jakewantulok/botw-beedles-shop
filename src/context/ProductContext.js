import React, { createContext, useState } from 'react';
import { productData } from '../data/productData';
export const ProductContext = createContext();

const ProductsContextProvider = ({ children }) => {
	const [products] = useState(productData);

	return <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>;
};

export default ProductsContextProvider;
