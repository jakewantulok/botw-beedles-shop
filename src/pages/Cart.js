import React, { useContext } from 'react';
import { Layout } from '../components/Layout/Layout';
import { CartContext } from '../context/CartContext';
import FormatCurrency from '../components/FormatCurrency/FormatCurrency';
import { Link } from 'react-router-dom';
import CartProducts from '../components/CartProducts/CartProducts';

export const Cart = () => {

    const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } = useContext(CartContext);
    
    const cartEmptyMsg = <div id="cartEmptyMsg" className="p-3 text-center text-muted">Your cart is empty</div>;
    const buyMoreBtn = 
        <div id="buyMoreBtn" className="p-3 text-center text-success">
            <p>Checkout successful</p>
            <Link to="/" className="btn btn-outline-success btn-sm" onClick={clearCart}>BUY MORE</Link>
        </div>;

    const itemsInCart =
        <>
            <CartProducts/>
            <div id="goToCheckout" className="card card-body col-sm-3 p-3">
                <p className="mb-1">Total Items</p>
                <h4 className="mb-3 txt-right">{itemCount}</h4>
                <p className="mb-1">Total Payment</p>
                <h3 className="m-0 txt-right">{FormatCurrency(total)}</h3>
                <hr className="my-4"/>
                <div className="text-center">
                    <button type="button" className="btn btn-primary mb-2" onClick={handleCheckout}>CHECKOUT</button>
                    <button type="button" className="btn btn-outlineprimary btn-sm" onClick={clearCart}>CLEAR ALL</button>
                </div>
            </div>
        </>;

    const refreshCart = () => {
        if (checkout) {
            return buyMoreBtn;
        } else if (cartItems.length > 0) {
            return itemsInCart;
        } else {
            return cartEmptyMsg;
        }
    };

    return ( 
        <Layout title="Cart" description="This is the Cart page">
            <div className="text-center mt-5">
                <h1>Cart</h1>
                <p>This is the Cart Page.</p>
            </div>

            <div className="row no-gutters justify-content-center">
                {refreshCart()}
            </div>
        </Layout>
     );
};
 
export default Cart;
