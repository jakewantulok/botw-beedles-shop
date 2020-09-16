import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Nav, Navbar } from 'react-bootstrap';
import { CartIcon } from './Icons';
import { storeConfig } from '../data/storeConfig';
import BeedleBanner from './BeedleBanner';
// #245e79

const Navigation = () => {
	const { itemCount } = useContext(CartContext);
	const { siteTitle } = storeConfig;
	return (
		<Navbar bg="light" styleexpand="md">
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
						Cart ({itemCount})
					</Nav.Link>
					{/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
				</Nav>
				{/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form> */}
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Navigation;
