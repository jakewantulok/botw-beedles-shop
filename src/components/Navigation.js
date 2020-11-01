import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { CartIcon } from './Icons';
import { storeConfig } from '../data/storeConfig';
import BeedleBanner from './BeedleBanner';
import { CartContext } from '../context/CartContext';
// #245e79

const Navigation = props => {
	const { siteTitle } = storeConfig;
	const { cartItems } = useContext(CartContext);
	const { themeHandler, theme } = props;

	return (
		<Navbar bg={theme} className={theme === 'light' ? 'navbar-light' : 'navbar-dark'} expand="md">
			<Container>
				<a href="/">
					<BeedleBanner />
				</a>
				<Navbar.Brand href="/" style={{ fontFamily: 'Sherwood', fontSize: 40, fontWeight: 'normal' }}>
					{siteTitle}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/cart">
							<CartIcon width={20} />
							Cart ({cartItems.length || 0})
						</Nav.Link>
						<button onClick={() => themeHandler()} />
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
