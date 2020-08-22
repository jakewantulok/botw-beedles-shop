import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Nav, Navbar } from 'react-bootstrap';
import { Layout } from '../Layout/Layout';
import { CartIcon } from '../Icons/Icons';

const Navigation = () => {
	const { itemCount } = useContext(CartContext);
	return (
		<Navbar bg="light" expand="lg">
			<Layout>
				<Navbar.Brand href="/">React Storefront</Navbar.Brand>
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
			</Layout>
		</Navbar>
	);
};

export default Navigation;
