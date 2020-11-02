import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { CartIcon, MoonIcon, SunIcon } from './Icons';
import { storeConfig } from '../data/storeConfig';
import BeedleBanner from './BeedleBanner';
import { CartContext } from '../context/CartContext';
import styled from 'styled-components';

const ThemeBtn = styled.button`
	padding: 0;
	border: none;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	box-shadow: 5px 5px 10px #16161d50;
`;

const NavBrandWrapper = styled.div`
	display: flex;
	align-items: center;
	& .shop-title {
		font-family: Sherwood;
		font-size: 30px;
		font-weight: normal;
	}
`;

const MobileThemeWrapper = styled.div`
	position: relative;
	width: 90%;
	height: 0;
	& button {
		position: absolute;
		top: 115px;
		right: -5px;
		z-index: 9999;
	}
`;

const Navigation = props => {
	const { siteTitle } = storeConfig;
	const { cartItems } = useContext(CartContext);
	const { themeHandler, theme } = props;

	return (
		<>
			<MobileThemeWrapper>
				<ThemeBtn
					className={theme === 'dark' ? 'btn-warning btn-theme mobile' : 'btn-filter btn-theme mobile'}
					onClick={() => themeHandler()}>
					{theme === 'dark' ? <SunIcon color="#16161d" /> : <MoonIcon color="#eeeeee" />}
				</ThemeBtn>
			</MobileThemeWrapper>
			<Navbar
				id="main-navigation"
				className={theme === 'light' ? 'navbar-light light' : 'navbar-dark dark'}
				expand="md">
				<Container>
					<NavBrandWrapper>
						<a href="/">
							<BeedleBanner />
						</a>
						<Navbar.Brand href="/">
							<span className="shop-title expanded">{siteTitle}</span>
							<span className="shop-title mobile">{siteTitle.split(' ')[0]}</span>
						</Navbar.Brand>
					</NavBrandWrapper>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
						<Nav>
							<Nav.Link href="/">Home</Nav.Link>
							<Nav.Link href="/cart">
								<CartIcon width={20} />
								Cart ( {cartItems.length || 0} )
							</Nav.Link>
							<ThemeBtn
								className={theme === 'dark' ? 'btn-warning btn-theme' : 'btn-filter btn-theme'}
								style={{ marginLeft: '25px' }}
								onClick={() => themeHandler()}>
								{theme === 'dark' ? <SunIcon color="#16161d" /> : <MoonIcon color="#eeeeee" />}
							</ThemeBtn>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Navigation;
