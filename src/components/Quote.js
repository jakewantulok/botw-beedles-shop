import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { CloseIcon } from './Icons';
import { beedleQuotes } from '../data/beedleQuotes';

const SpeechBubble = styled.button`
	font-style: italic;
	font-size: 14px;
	position: absolute;
	bottom: 65%;
	right: 50%;
	color: #eee;
	background: #16161d;
	padding: 5px 5px 5px 10px;
	border: 0px;
	border-radius: 15px 15px 0px 15px;
	z-index: 999;
	min-width: 235px;
	max-width: 235px;
	box-shadow: 5px 5px 10px #16161d50;
	opacity: 90%;
	text-align: left;
	margin: 25px;
`;

const CloseBubble = styled.div`
	width: 26px;
	height: 26px;
	border-radius: 50%;
	text-align: center;
	font-weight: 600;
	font-size: 17px;
	font-style: normal;
	position: absolute;
	top: -5%;
	right: -10%;
`;

const Offer = styled.div`
	margin-top: 10px;
`;

const Quote = () => {
	const num = 5;
	const getQuote = beedleQuotes[num].quote;
	const offer = beedleQuotes[num].offer;
	const offerCode = beedleQuotes[num].offerCode;

	const [isToggled, setIsToggled] = useState(false);

	// here we added [isToggled, setIsToggled] as a second parameter
	const toggle = useCallback(() => setIsToggled(!isToggled), [isToggled, setIsToggled]);

	return (
		getQuote && (
			<SpeechBubble style={{ display: isToggled && 'none' }} onClick={() => toggle()}>
				<div>
					<span>{getQuote}</span>
				</div>
				{offer && (
					<Offer>
						<span>
							Use code <strong className="text-info">'{offerCode}'</strong> for a free
							<strong className="text-info">{' ' + offer + ' '}</strong> at checkout!
						</span>
					</Offer>
				)}
				<CloseBubble>
					<CloseIcon width={25} color="white" />
				</CloseBubble>
			</SpeechBubble>
		)
	);
};

export default Quote;
