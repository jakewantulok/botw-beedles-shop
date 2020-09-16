import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block; 
  position relative;
  width: 60px;
  height: 73px;
  margin-right: 15px;
`;

const Banner = styled.div`
	position: absolute;
	width: 60px;
	height: 73px;
	background: white;
	margin-bottom: 20px;
	z-index: 998;
	&::after {
		content: '';
		position: absolute;
		left: 0;
		top: 73px;
		width: 0;
		height: 0;
		border-left: 30px solid transparent;
		border-right: 30px solid transparent;
		border-top: 24px solid white;
		clear: both;
		z-index: 998;
	}
	& > img {
		position: relative;
		width: 60px;
		z-index: 999;
	}
`;

const BeedleBanner = ({ children }) => (
	<Wrapper>
		<Banner>
			<img src="/img/beedle_shop_banner.png" />
			{children}
		</Banner>
	</Wrapper>
);

export default BeedleBanner;
