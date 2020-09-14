import React from 'react';
import styled from 'styled-components';
import Quote from './Quote';

const Wrapper = styled.div`
	display: block;
	position: fixed;
	width: 75px;
	bottom: 15px;
	right: 15px;
`;

const Face = styled.img`
	border: 5px solid #17a2b8;
	border-radius 50%;
	box-shadow: 5px 5px 10px #16161d50;
	background: #17a2b8;
`;

const Beedle = () => (
	<Wrapper id="Beedle">
		<Quote />
		<Face src="./img/beedle_face.png" alt="beedle" width={75} />
	</Wrapper>
);

export default Beedle;
