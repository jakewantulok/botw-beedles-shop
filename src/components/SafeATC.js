import React from 'react';
// import { Link } from 'react-router-dom';

import ATC from './ATC';
import QtyMsg from './QtyMsg';

import styled from 'styled-components';
const Btn = styled.button`
	margin: 10px 10px 10px 0;
`;

const SafeATC = ({ item }) => (
	<>
		{item.name ? (
			<ATC item={item} />
		) : (
			<Btn disabled={true} className="btn btn-dark">
				SELECT AN OPTION
			</Btn>
		)}
		<QtyMsg item={item} />
		{/* <Link to={'/product/' + product.pathname}>Details</Link> */}
	</>
);

export default SafeATC;
