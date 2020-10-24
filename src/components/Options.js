import React from 'react';

import styled from 'styled-components';

const OptionWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const Option = styled.button`
	display: flex;
	justify-content: center;
	margin: 0 8px 0 0;
	width: 28px;
	height: 28px;
	font-size: 12px;
`;

const DescTitle = styled.div`
	position: relative;
	& span {
		position: absolute;
		top: -6px;
		font-size: 12px;
	}
`;

const Desc = styled.div`
	position: relative;
	top: 12px;
	max-width: 200px;
	height: 30px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 12px;
	font-style: italic;
	& span:nth-child(2) {
		line-height: 0;
	}
`;

const Options = props => {
	const { productState, productInfo: product, select } = props;

	const optionBtns = product.sale.map((option, i) => (
		<Option
			key={i}
			className={
				option.name
					? productState.name === product.name + ' ' + option.name
						? 'btn btn-sm btn-dark'
						: 'btn btn-sm btn-light'
					: 'btn btn-sm'
			}
			onClick={() =>
				select({
					...productState,
					name: product.name + ' ' + option.name,
					price: option.price,
					bulk: option.bulk,
				})
			}>
			<span>{option.name}</span>
		</Option>
	));

	return product.sale.length > 1 ? (
		<OptionWrapper>{optionBtns}</OptionWrapper>
	) : (
		<>
			<DescTitle>
				<span>Description: </span>
			</DescTitle>
			<Desc>
				<span>{product.description}</span>
			</Desc>
		</>
	);
};

export default Options;
