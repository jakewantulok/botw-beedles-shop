import React, { useContext } from 'react';
import { ProductItem } from '../ProductItem/ProductItem';
import { ProductContext } from '../../context/ProductContext';

const ProductGrid = () => {

    const { products } = useContext(ProductContext);

    const renderProducts = products.map(product => <ProductItem key={product.id} product={product}/>);

    return ( 
        <div>
            <div className="row">
                <div className="col-sm-8">
                    <div className="py-3">
                        {products.length} Products
                    </div>
                </div>
            </div>
            <div>
                {renderProducts}
            </div>
        </div>
     );
}
 
export default ProductGrid;
